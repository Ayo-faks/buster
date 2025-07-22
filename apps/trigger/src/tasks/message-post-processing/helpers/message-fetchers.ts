import { getPermissionedDatasets } from '@buster/access-controls';
import { and, chats, eq, getDb, isNotNull, isNull, lte, messages, users } from '@buster/database';
import type { CoreMessage } from 'ai';
import {
  DataFetchError,
  type MessageContext,
  MessageNotFoundError,
  type PostProcessingResult,
} from '../types';

/**
 * Fetch current message with user and chat info
 */
export async function fetchMessageWithContext(messageId: string): Promise<MessageContext> {
  const db = getDb();

  try {
    const result = await db
      .select({
        id: messages.id,
        chatId: messages.chatId,
        createdBy: messages.createdBy,
        createdAt: messages.createdAt,
        rawLlmMessages: messages.rawLlmMessages,
        userName: users.name,
        userEmail: users.email,
        organizationId: chats.organizationId,
      })
      .from(messages)
      .innerJoin(chats, eq(messages.chatId, chats.id))
      .leftJoin(users, eq(messages.createdBy, users.id))
      .where(and(eq(messages.id, messageId), isNull(messages.deletedAt)))
      .limit(1);

    const messageData = result[0];
    if (!messageData) {
      throw new MessageNotFoundError(messageId);
    }

    return {
      id: messageData.id,
      chatId: messageData.chatId,
      createdBy: messageData.createdBy,
      createdAt: new Date(messageData.createdAt),
      rawLlmMessages: messageData.rawLlmMessages as CoreMessage[],
      userName: messageData.userName ?? messageData.userEmail ?? 'Unknown',
      organizationId: messageData.organizationId,
    };
  } catch (error) {
    if (error instanceof MessageNotFoundError) {
      throw error;
    }
    throw new DataFetchError(
      `Failed to fetch message context for ${messageId}`,
      error instanceof Error ? { cause: error } : undefined
    );
  }
}

/**
 * Fetch previous post-processing results
 */
export async function fetchPreviousPostProcessingMessages(
  chatId: string,
  beforeTimestamp: Date
): Promise<PostProcessingResult[]> {
  const db = getDb();

  try {
    const result = await db
      .select({
        postProcessingMessage: messages.postProcessingMessage,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .where(
        and(
          eq(messages.chatId, chatId),
          isNotNull(messages.postProcessingMessage),
          isNull(messages.deletedAt),
          lte(messages.createdAt, beforeTimestamp.toISOString())
        )
      )
      .orderBy(messages.createdAt);

    return result.map((msg) => ({
      postProcessingMessage: msg.postProcessingMessage as Record<string, unknown>,
      createdAt: new Date(msg.createdAt),
    }));
  } catch (error) {
    throw new DataFetchError(
      `Failed to fetch previous post-processing messages for chat ${chatId}`,
      error instanceof Error ? { cause: error } : undefined
    );
  }
}

/**
 * Fetch user's permissioned datasets
 */
export async function fetchUserDatasets(userId: string) {
  try {
    // Using the existing access control function
    const datasets = await getPermissionedDatasets(userId, 0, 1000);
    return datasets;
  } catch (error) {
    throw new DataFetchError(
      `Failed to fetch datasets for user ${userId}`,
      error instanceof Error ? { cause: error } : undefined
    );
  }
}
