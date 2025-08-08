import { dashboardFiles, db, metricFiles, metricFilesToDashboardFiles } from '@buster/database';
import { updateMessageFields } from '@buster/database';
import { wrapTraced } from 'braintrust';
import { and, eq, inArray, isNull } from 'drizzle-orm';
import * as yaml from 'yaml';
import { z } from 'zod';
import { trackFileAssociations } from '../file-tracking-helper';
import { addDashboardVersionToHistory, getLatestVersionNumber } from '../version-history-helpers';
import type { DashboardYml, VersionHistory } from '../version-history-types';
import { createDashboardsReasoningMessage } from './helpers/modify-dashboards-transform-helper';
import type {
  ModifyDashboardsAgentContext,
  ModifyDashboardsInput,
  ModifyDashboardsOutput,
  ModifyDashboardsState,
} from './modify-dashboards-tool';

// Core interfaces matching Rust structs
interface FileUpdate {
  id: string;
  yml_content: string;
}

interface UpdateFilesParams {
  files: FileUpdate[];
}

interface FailedFileModification {
  file_name: string;
  error: string;
}

interface ModificationResult {
  file_id: string;
  file_name: string;
  success: boolean;
  error?: string;
  modification_type: string;
  timestamp: string;
  duration: number;
}

interface ValidationResult {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

interface FileWithId {
  id: string;
  name: string;
  file_type: string;
  result_message?: string;
  results?: ValidationResult[];
  created_at: string;
  updated_at: string;
  version_number: number;
}

interface ModifyFilesOutput {
  message: string;
  duration: number;
  files: FileWithId[];
  failed_files: FailedFileModification[];
}

// Dashboard YAML schema validation with full rules
const dashboardItemSchema = z.object({
  id: z.string().uuid('Must be a valid UUID for an existing metric'),
});

const dashboardRowSchema = z
  .object({
    id: z.number().int().positive('Row ID must be a positive integer'),
    items: z
      .array(dashboardItemSchema)
      .min(1, 'Each row must have at least 1 item')
      .max(4, 'Each row can have at most 4 items'),
    column_sizes: z
      .array(
        z
          .number()
          .int()
          .min(3, 'Each column size must be at least 3')
          .max(12, 'Each column size cannot exceed 12')
      )
      .min(1, 'column_sizes array cannot be empty')
      .refine((sizes) => sizes.reduce((sum, size) => sum + size, 0) === 12, {
        message: 'Column sizes must sum to exactly 12',
      }),
  })
  .refine((row) => row.items.length === row.column_sizes.length, {
    message: 'Number of items must match number of column sizes',
  });

const dashboardYmlSchema = z.object({
  name: z.string().min(1, 'Dashboard name is required'),
  description: z.string().min(1, 'Dashboard description is required').optional(),
  rows: z
    .array(dashboardRowSchema)
    .min(1, 'Dashboard must have at least one row')
    .refine(
      (rows) => {
        const ids = rows.map((row) => row.id);
        const uniqueIds = new Set(ids);
        return ids.length === uniqueIds.size;
      },
      {
        message: 'All row IDs must be unique',
      }
    ),
});

// Parse and validate dashboard YAML content
function parseAndValidateYaml(ymlContent: string): {
  success: boolean;
  error?: string;
  data?: DashboardYml;
} {
  try {
    const parsedYml = yaml.parse(ymlContent);
    const validationResult = dashboardYmlSchema.safeParse(parsedYml);

    if (!validationResult.success) {
      return {
        success: false,
        error: `Invalid YAML structure: ${validationResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
      };
    }

    // Transform the validated data to match the expected DashboardYml type
    const transformedData: DashboardYml = {
      name: validationResult.data.name,
      description: validationResult.data.description,
      rows: validationResult.data.rows.map((row) => ({
        id: row.id,
        items: row.items,
        columnSizes: row.column_sizes,
        rowHeight: undefined, // Optional field, set to undefined if not provided
      })),
    };

    return { success: true, data: transformedData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'YAML parsing failed',
    };
  }
}

// Validate that all referenced metric IDs exist in the database
async function validateMetricIds(
  metricIds: string[]
): Promise<{ success: boolean; missingIds?: string[]; error?: string }> {
  if (metricIds.length === 0) {
    return { success: true };
  }

  try {
    const existingMetrics = await db
      .select({ id: metricFiles.id })
      .from(metricFiles)
      .where(inArray(metricFiles.id, metricIds))
      .execute();

    const existingIds = existingMetrics.map((m) => m.id);
    const missingIds = metricIds.filter((id) => !existingIds.includes(id));

    if (missingIds.length > 0) {
      return { success: false, missingIds };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to validate metric IDs',
    };
  }
}

// Process a dashboard file update with complete new YAML content
async function processDashboardFileUpdate(
  file: typeof dashboardFiles.$inferSelect,
  ymlContent: string,
  duration: number
): Promise<{
  dashboardFile: typeof dashboardFiles.$inferSelect;
  dashboardYml: DashboardYml;
  results: ModificationResult[];
  validationMessage: string;
  validationResults: Record<string, unknown>[];
}> {
  const results: ModificationResult[] = [];

  // Create and validate new YML object
  const yamlValidation = parseAndValidateYaml(ymlContent);
  if (!yamlValidation.success || !yamlValidation.data) {
    const error = `Failed to validate modified YAML: ${yamlValidation.error}`;
    results.push({
      file_id: file.id,
      file_name: file.name,
      success: false,
      error,
      modification_type: 'validation',
      timestamp: new Date().toISOString(),
      duration,
    });
    // Return error instead of throwing
    return Promise.reject(new Error(error));
  }

  const newYml = yamlValidation.data;

  // Collect and validate metric IDs from rows
  const metricIds: string[] = newYml.rows.flatMap((row) => row.items).map((item) => item.id);

  if (metricIds.length > 0) {
    const metricValidation = await validateMetricIds(metricIds);
    if (!metricValidation.success) {
      let error: string;
      if (metricValidation.missingIds && metricValidation.missingIds.length > 0) {
        error = `Invalid metric references: ${metricValidation.missingIds.join(', ')}`;
      } else {
        error = `Failed to validate metrics: ${metricValidation.error}`;
      }

      results.push({
        file_id: file.id,
        file_name: file.name,
        success: false,
        error,
        modification_type: 'validation',
        timestamp: new Date().toISOString(),
        duration,
      });
      // Return error instead of throwing
      return Promise.reject(new Error(error));
    }
  }

  // Update file record
  file.content = newYml;
  file.updatedAt = new Date().toISOString();
  // Also update the file name to match the YAML name
  file.name = newYml.name;

  // Track successful update
  results.push({
    file_id: file.id,
    file_name: file.name,
    success: true,
    error: '',
    modification_type: 'content',
    timestamp: new Date().toISOString(),
    duration,
  });

  // Return successful result with empty validation results
  // since dashboards don't have SQL to validate like metrics do
  return {
    dashboardFile: file,
    dashboardYml: newYml,
    results,
    validationMessage: 'Dashboard validation successful',
    validationResults: [],
  };
}

// Main modify dashboard files function
const modifyDashboardFiles = wrapTraced(
  async (params: UpdateFilesParams, context: ModifyDashboardsAgentContext): Promise<ModifyFilesOutput> => {
    const startTime = Date.now();

    // Get context values (for logging/tracking)
    const userId = context.userId;
    const organizationId = context.organizationId;
    const messageId = context.messageId;

    if (!userId) {
      throw new Error('User ID not found in runtime context');
    }
    if (!organizationId) {
      throw new Error('Organization ID not found in runtime context');
    }

    const files: FileWithId[] = [];
    const failedFiles: FailedFileModification[] = [];
    const updateResults: ModificationResult[] = [];

    const dashboardFilesToUpdate: (typeof dashboardFiles.$inferSelect)[] = [];

    try {
      // Process each file update
      for (const fileUpdate of params.files) {
        try {
          // Get the dashboard file from database
          const dashboardFile = await db
            .select()
            .from(dashboardFiles)
            .where(eq(dashboardFiles.id, fileUpdate.id))
            .execute();

          if (dashboardFile.length === 0) {
            failedFiles.push({
              file_name: `Dashboard ${fileUpdate.id}`,
              error: 'Dashboard file not found',
            });
            continue;
          }

          const existingFile = dashboardFile[0];
          if (!existingFile) {
            failedFiles.push({
              file_name: `Dashboard ${fileUpdate.id}`,
              error: 'Dashboard file not found after query',
            });
            continue;
          }
          const duration = Date.now() - startTime;

          // Process the dashboard file update
          const updateResult = await processDashboardFileUpdate(
            { ...existingFile }, // Create a copy to modify
            fileUpdate.yml_content,
            duration
          );

          const { dashboardFile: updatedFile, dashboardYml, results } = updateResult;

          // Get current version history
          const currentVersionHistory = existingFile.versionHistory as VersionHistory | null;

          // Add new version to history
          const updatedVersionHistory = addDashboardVersionToHistory(
            currentVersionHistory,
            dashboardYml,
            new Date().toISOString()
          );

          updatedFile.versionHistory = updatedVersionHistory;

          // Ensure the name field is updated
          updatedFile.name = dashboardYml.name;

          dashboardFilesToUpdate.push(updatedFile);
          updateResults.push(...results);
        } catch (error) {
          failedFiles.push({
            file_name: `Dashboard ${fileUpdate.id}`,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      // Update dashboard files in database with version history
      if (dashboardFilesToUpdate.length > 0) {
        await db.transaction(async (tx) => {
          // Update dashboard files
          for (const file of dashboardFilesToUpdate) {
            await tx
              .update(dashboardFiles)
              .set({
                content: file.content,
                updatedAt: file.updatedAt,
                versionHistory: file.versionHistory,
                name: file.name,
              })
              .where(eq(dashboardFiles.id, file.id))
              .execute();
          }

          for (const file of dashboardFilesToUpdate) {
            // Get current metric IDs from updated dashboard content
            const newMetricIds = (file.content as DashboardYml).rows
              .flatMap((row) => row.items)
              .map((item) => item.id);

            const existingAssociations = await tx
              .select({ metricFileId: metricFilesToDashboardFiles.metricFileId })
              .from(metricFilesToDashboardFiles)
              .where(
                and(
                  eq(metricFilesToDashboardFiles.dashboardFileId, file.id),
                  isNull(metricFilesToDashboardFiles.deletedAt)
                )
              )
              .execute();

            const existingMetricIds = existingAssociations.map((a) => a.metricFileId);

            const addedMetricIds = newMetricIds.filter(
              (id: string) => !existingMetricIds.includes(id)
            );
            for (const metricId of addedMetricIds) {
              await tx
                .insert(metricFilesToDashboardFiles)
                .values({
                  metricFileId: metricId,
                  dashboardFileId: file.id,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  deletedAt: null,
                  createdBy: userId,
                })
                .onConflictDoUpdate({
                  target: [
                    metricFilesToDashboardFiles.metricFileId,
                    metricFilesToDashboardFiles.dashboardFileId,
                  ],
                  set: {
                    deletedAt: null,
                    updatedAt: new Date().toISOString(),
                  },
                })
                .execute();
            }

            const removedMetricIds = existingMetricIds.filter(
              (id: string) => !newMetricIds.includes(id)
            );
            if (removedMetricIds.length > 0) {
              await tx
                .update(metricFilesToDashboardFiles)
                .set({
                  deletedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                })
                .where(
                  and(
                    eq(metricFilesToDashboardFiles.dashboardFileId, file.id),
                    inArray(metricFilesToDashboardFiles.metricFileId, removedMetricIds),
                    isNull(metricFilesToDashboardFiles.deletedAt)
                  )
                )
                .execute();
            }
          }
        });

        // Add successful files to output
        for (const file of dashboardFilesToUpdate) {
          // Get the latest version number
          const latestVersion = getLatestVersionNumber(file.versionHistory as VersionHistory);

          files.push({
            id: file.id,
            name: file.name,
            file_type: 'dashboard',
            result_message: 'Dashboard validation successful',
            results: [],
            created_at: file.createdAt,
            updated_at: file.updatedAt,
            version_number: latestVersion,
          });
        }
      }
    } catch (error) {
      return {
        message: `Failed to update dashboard files: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: Date.now() - startTime,
        files: [],
        failed_files: [],
      };
    }

    // Track file associations if messageId is available
    if (messageId && files.length > 0) {
      await trackFileAssociations({
        messageId,
        files: files.map((file) => ({
          id: file.id,
          version: file.version_number,
        })),
      });
    }

    // Generate result message
    const successCount = files.length;
    const failureCount = failedFiles.length;

    let message: string;
    if (successCount > 0 && failureCount === 0) {
      message = `Successfully modified ${successCount} dashboard file${successCount === 1 ? '' : 's'}.`;
    } else if (successCount === 0 && failureCount > 0) {
      message = `Failed to modify ${failureCount} dashboard file${failureCount === 1 ? '' : 's'}.`;
    } else if (successCount > 0 && failureCount > 0) {
      message = `Successfully modified ${successCount} dashboard file${successCount === 1 ? '' : 's'}, ${failureCount} failed.`;
    } else {
      message = 'No dashboard files were processed.';
    }

    return {
      message,
      duration: Date.now() - startTime,
      files,
      failed_files: failedFiles,
    };
  },
  { name: 'modify-dashboard-files' }
);

export function createModifyDashboardsExecute<
  TAgentContext extends ModifyDashboardsAgentContext = ModifyDashboardsAgentContext,
>(context: TAgentContext, state: ModifyDashboardsState) {
  return wrapTraced(
    async (input: ModifyDashboardsInput): Promise<ModifyDashboardsOutput> => {
      const startTime = Date.now();
      const messageId = context.messageId;

      // Update state with execution progress
      state.parsedArgs = input;
      state.files = input.files.map((file) => ({
        id: file.id,
        yml_content: file.yml_content,
        status: 'processing' as const,
      }));

      // Call the main function directly instead of delegating
      const result = await modifyDashboardFiles(
        input as UpdateFilesParams,
        context
      );

      // Update state files with final results
      if (result.files) {
        result.files.forEach((file) => {
          const stateFile = state.files.find((f) => f.id === file.id);
          if (stateFile) {
            stateFile.status = 'completed';
            stateFile.name = file.name;
            stateFile.version = file.version_number;
          }
        });
      }

      if (result.failed_files) {
        result.failed_files.forEach((failedFile) => {
          // Try to match by name since failed files might not have IDs
          const stateFile = state.files.find((f) => f.name === failedFile.file_name);
          if (stateFile) {
            stateFile.status = 'failed';
            stateFile.error = failedFile.error;
          }
        });
      }

      // Create final reasoning entry if messageId exists
      if (messageId) {
        try {
          const reasoningEntry = createDashboardsReasoningMessage(
            state.toolCallId || `modify-dashboards-${Date.now()}`,
            state.files,
            'completed'
          );

          await updateMessageFields(messageId, {
            reasoning: [reasoningEntry],
          });

          const duration = Date.now() - startTime;
          console.info('[modify-dashboards] Execution completed', {
            messageId,
            duration,
            successCount: result.files.length,
            failedCount: result.failed_files.length,
          });
        } catch (error) {
          console.error('[modify-dashboards] Failed to update final reasoning', {
            messageId,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      return result as ModifyDashboardsOutput;
    },
    { name: 'modify-dashboards-execute' }
  );
}