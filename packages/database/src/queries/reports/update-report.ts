import { and, eq, isNull } from 'drizzle-orm';
import {} from 'drizzle-zod';
import { z } from 'zod';
import { db } from '../../connection';
import { reportFiles } from '../../schema';
import { workspaceSharingEnum } from '../../schema';
import { ReportElementSchema, type ReportElements } from '../../schema-types';

const WorkspaceSharingSchema = z.enum(workspaceSharingEnum.enumValues);

// Input validation schema for updating a report
const UpdateReportInputSchema = z.object({
  reportId: z.string().uuid('Report ID must be a valid UUID'),
  organizationId: z.string().uuid('Organization ID must be a valid UUID'),
  userId: z.string().uuid('User ID must be a valid UUID'),
  name: z.string().optional(),
  publicly_accessible: z.boolean().optional(),
  content: z.lazy(() => z.array(ReportElementSchema)).optional() as z.ZodOptional<
    z.ZodType<ReportElements>
  >,
  public_expiry_date: z.string().optional(),
  public_password: z.string().optional(),
  workspace_sharing: WorkspaceSharingSchema.optional(),
});

type UpdateReportInput = z.infer<typeof UpdateReportInputSchema>;

/**
 * Updates a report with the provided fields
 * Only updates fields that are provided in the input
 * Always updates the updatedAt timestamp
 */
export const updateReport = async (params: UpdateReportInput): Promise<void> => {
  // Validate and destructure input
  const {
    reportId,
    organizationId,
    userId,
    name,
    publicly_accessible,
    content,
    public_expiry_date,
    public_password,
    workspace_sharing,
  } = UpdateReportInputSchema.parse(params);

  try {
    // Build update data - only include fields that are provided
    const updateData: {
      updatedAt: string;
      name?: string;
      publiclyAccessible?: boolean;
      publiclyEnabledBy?: string | null;
      content?: ReportElements;
      publicExpiryDate?: string;
      publicPassword?: string;
      workspaceSharing?: 'none' | 'can_view' | 'can_edit' | 'full_access';
      workspaceSharingEnabledBy?: string | null;
      workspaceSharingEnabledAt?: string | null;
    } = {
      updatedAt: new Date().toISOString(),
    };

    // Only add fields that are provided
    if (name !== undefined) {
      updateData.name = name;
    }

    if (publicly_accessible !== undefined) {
      updateData.publiclyAccessible = publicly_accessible;
      // Set publiclyEnabledBy to userId when enabling, null when disabling
      updateData.publiclyEnabledBy = publicly_accessible ? userId : null;
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (public_expiry_date !== undefined) {
      updateData.publicExpiryDate = public_expiry_date;
    }

    if (public_password !== undefined) {
      updateData.publicPassword = public_password;
    }

    if (workspace_sharing !== undefined) {
      updateData.workspaceSharing = workspace_sharing;

      if (workspace_sharing !== 'none') {
        updateData.workspaceSharingEnabledBy = userId;
        updateData.workspaceSharingEnabledAt = new Date().toISOString();
      } else {
        updateData.workspaceSharingEnabledBy = null;
        updateData.workspaceSharingEnabledAt = null;
      }
    }

    // Update report in database
    await db
      .update(reportFiles)
      .set(updateData)
      .where(
        and(
          eq(reportFiles.id, reportId),
          eq(reportFiles.organizationId, organizationId),
          isNull(reportFiles.deletedAt)
        )
      );
  } catch (error) {
    console.error('Error updating report:', {
      reportId,
      organizationId,
      error: error instanceof Error ? error.message : error,
    });

    // Re-throw with more context
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to update report');
  }
};
