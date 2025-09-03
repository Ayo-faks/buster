import type { ModelMessage } from 'ai';
import { and, eq, isNull } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../connection';
import { messages } from '../../schema';
import { ReasoningMessageSchema, ResponseMessageSchema } from '../../schemas/message-schemas';
import { fetchMessageEntries } from './helpers/fetch-message-entries';
import {
  mergeRawLlmMessages,
  mergeReasoningMessages,
  mergeResponseMessages,
} from './helpers/merge-entries';
import { messageEntriesCache } from './message-entries-cache';

const UpdateMessageEntriesSchema = z.object({
  messageId: z.string().uuid(),
  rawLlmMessages: z.array(z.custom<ModelMessage>()).optional(),
  responseMessages: z.array(ResponseMessageSchema).optional(),
  reasoningMessages: z.array(ReasoningMessageSchema).optional(),
});

export type UpdateMessageEntriesParams = z.infer<typeof UpdateMessageEntriesSchema>;

/**
 * Updates message entries with cache-first approach for streaming.
 * Cache is the source of truth during streaming, DB is updated for persistence.
 *
 * Merge logic:
 * - responseMessages: upsert by 'id' field, maintaining order
 * - reasoningMessages: upsert by 'id' field, maintaining order
 * - rawLlmMessages: upsert by combination of 'role' and 'toolCallId', maintaining order
 */
export async function updateMessageEntries({
  messageId,
  rawLlmMessages,
  responseMessages,
  reasoningMessages,
}: UpdateMessageEntriesParams): Promise<{ success: boolean }> {
  try {
    // Fetch existing entries from cache or database
    const existingEntries = await fetchMessageEntries(messageId);

    if (!existingEntries) {
      throw new Error(`Message not found: ${messageId}`);
    }

    // Merge all entries concurrently
    const [mergedResponseMessages, mergedReasoning, mergedRawLlmMessages] = await Promise.all([
      responseMessages
        ? Promise.resolve(mergeResponseMessages(existingEntries.responseMessages, responseMessages))
        : Promise.resolve(existingEntries.responseMessages),
      reasoningMessages
        ? Promise.resolve(mergeReasoningMessages(existingEntries.reasoning, reasoningMessages))
        : Promise.resolve(existingEntries.reasoning),
      rawLlmMessages
        ? Promise.resolve(mergeRawLlmMessages(existingEntries.rawLlmMessages, rawLlmMessages))
        : Promise.resolve(existingEntries.rawLlmMessages),
    ]);

    const mergedEntries = {
      responseMessages: mergedResponseMessages,
      reasoning: mergedReasoning,
      rawLlmMessages: mergedRawLlmMessages,
    };

    // Build update data
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (responseMessages) {
      updateData.responseMessages = mergedEntries.responseMessages;
    }

    if (reasoningMessages) {
      updateData.reasoning = mergedEntries.reasoning;
    }

    if (rawLlmMessages) {
      updateData.rawLlmMessages = mergedEntries.rawLlmMessages;
    }

    // Update cache and database concurrently
    await Promise.all([
      // Update cache immediately (cache is source of truth during streaming)
      Promise.resolve(messageEntriesCache.set(messageId, mergedEntries)),
      // Update database for persistence
      db
        .update(messages)
        .set(updateData)
        .where(and(eq(messages.id, messageId), isNull(messages.deletedAt))),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Failed to update message entries:', error);
    throw new Error(`Failed to update message entries for message ${messageId}`);
  }
}
