import type { Sandbox } from '@buster/sandbox';
import { tool } from 'ai';
import { z } from 'zod';
import { createListFilesToolDelta } from './list-files-tool-delta';
import { createListFilesToolExecute } from './list-files-tool-execute';
import { createListFilesToolFinish } from './list-files-tool-finish';
import { createListFilesToolStart } from './list-files-tool-start';

const ListFilesOptionsSchema = z.object({
  depth: z
    .number()
    .optional()
    .describe('Limit directory depth with -L flag (e.g., 2 for two levels deep)'),
  all: z.boolean().optional().describe('Use -a flag to include hidden files and directories'),
  dirsOnly: z.boolean().optional().describe('Use -d flag to show only directories'),
  ignorePattern: z
    .string()
    .optional()
    .describe('Use -I flag with pattern to exclude files/dirs (e.g., "node_modules|*.log")'),
  followSymlinks: z.boolean().optional().describe('Use -l flag to follow symbolic links'),
});

export const ListFilesToolInputSchema = z.object({
  paths: z
    .array(z.string())
    .describe(
      'Array of paths to display tree structure for. Can be absolute paths (e.g., /path/to/directory) or relative paths (e.g., ./relative/path).'
    ),
  options: ListFilesOptionsSchema.optional().describe('Options for tree command execution'),
});

const ListFilesToolOutputSchema = z.object({
  results: z.array(
    z.discriminatedUnion('status', [
      z.object({
        status: z.literal('success'),
        path: z.string(),
        output: z.string().describe('Raw output from tree command'),
        currentDirectory: z
          .string()
          .optional()
          .describe('The current working directory when the tree was generated'),
      }),
      z.object({
        status: z.literal('error'),
        path: z.string(),
        error_message: z.string(),
      }),
    ])
  ),
});

const ListFilesToolContextSchema = z.object({
  messageId: z.string().describe('The message ID for database updates'),
  sandbox: z
    .custom<Sandbox>(
      (val) => {
        return val && typeof val === 'object' && 'id' in val && 'process' in val;
      },
      { message: 'Invalid Sandbox instance' }
    )
    .describe('Sandbox instance for file operations'),
});

const ListFilesToolStateSchema = z.object({
  entry_id: z.string().optional().describe('The entry ID for database updates'),
  args: z.string().optional().describe('Accumulated streaming arguments'),
  paths: z.array(z.string()).optional().describe('Parsed paths from streaming input'),
  options: ListFilesOptionsSchema.optional().describe('Parsed options from streaming input'),
});

export type ListFilesToolInput = z.infer<typeof ListFilesToolInputSchema>;
export type ListFilesToolOutput = z.infer<typeof ListFilesToolOutputSchema>;
export type ListFilesToolContext = z.infer<typeof ListFilesToolContextSchema>;
export type ListFilesToolState = z.infer<typeof ListFilesToolStateSchema>;

export function createListFilesTool<
  TAgentContext extends ListFilesToolContext = ListFilesToolContext,
>(context: TAgentContext) {
  const state: ListFilesToolState = {
    entry_id: undefined,
    args: undefined,
    paths: undefined,
    options: undefined,
  };

  const execute = createListFilesToolExecute(state, context);
  const onInputStart = createListFilesToolStart(state, context);
  const onInputDelta = createListFilesToolDelta(state, context);
  const onInputAvailable = createListFilesToolFinish(state, context);

  return tool({
    description: `Displays the directory structure in a hierarchical tree format. Automatically excludes git-ignored files. Supports various options like depth limiting, showing only directories, following symlinks, and custom ignore patterns. Returns the raw text output showing the file system hierarchy with visual tree branches that clearly show parent-child relationships. Accepts both absolute and relative paths and can handle bulk operations through an array of paths.`,
    inputSchema: ListFilesToolInputSchema,
    outputSchema: ListFilesToolOutputSchema,
    execute,
    onInputStart,
    onInputDelta,
    onInputAvailable,
  });
}
