import { updateChat, updateMessage } from '@buster/database';
import { createStep } from '@mastra/core';
import type { RuntimeContext } from '@mastra/core/runtime-context';
import { generateObject } from 'ai';
import type { CoreMessage } from 'ai';
import { wrapTraced } from 'braintrust';
import { z } from 'zod';
import { thinkAndPrepWorkflowInputSchema } from '../schemas/workflow-schemas';
import { GPT5Mini } from '../utils/models/gpt-5-mini';
import { Haiku35 } from '../utils/models/haiku-3-5';
import { appendToConversation, standardizeMessages } from '../utils/standardizeMessages';
import type { AnalystRuntimeContext } from '../workflows/analyst-workflow';

const inputSchema = thinkAndPrepWorkflowInputSchema;

// Schema for what the LLM returns
const llmOutputSchema = z.object({
  title: z.string().describe('The title for the chat.'),
});

// Schema for what the step returns (includes pass-through data)
export const generateChatTitleOutputSchema = z.object({
  title: z.string().describe('The title for the chat.'),
  // Pass through dashboard context
  dashboardFiles: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        versionNumber: z.number(),
        metricIds: z.array(z.string()),
      })
    )
    .optional(),
});

const generateChatTitleInstructions = `
I am a chat title generator that is responsible for generating a title for the chat.

The title should be 3-8 words, capturing the main topic or intent of the conversation.
`;

const generateChatTitleExecution = async ({
  inputData,
  runtimeContext,
}: {
  inputData: z.infer<typeof inputSchema>;
  runtimeContext: RuntimeContext<AnalystRuntimeContext>;
}): Promise<z.infer<typeof generateChatTitleOutputSchema>> => {
  try {
    // Use the input data directly
    const prompt = inputData.prompt;
    const conversationHistory = inputData.conversationHistory;

    // Prepare messages for the agent
    let messages: CoreMessage[];
    if (conversationHistory && conversationHistory.length > 0) {
      // Use conversation history as context + append new user message
      messages = appendToConversation(conversationHistory as CoreMessage[], prompt);
    } else {
      // Otherwise, use just the prompt
      messages = standardizeMessages(prompt);
    }

    let title: { title: string };

    try {
      const tracedChatTitle = wrapTraced(
        async () => {
          const { object } = await generateObject({
            model: GPT5Mini,
            schema: llmOutputSchema,
            messages: [
              {
                role: 'system',
                content: generateChatTitleInstructions,
              },
              ...messages,
            ],
            temperature: 1,
            providerOptions: {
              openai: {
                parallelToolCalls: false,
                reasoningEffort: 'minimal',
              },
            },
          });

          return object;
        },
        {
          name: 'Generate Chat Title',
        }
      );

      title = await tracedChatTitle();
    } catch (llmError) {
      // Handle LLM generation errors specifically
      console.warn('[GenerateChatTitle] LLM failed to generate valid response:', {
        error: llmError instanceof Error ? llmError.message : 'Unknown error',
        errorType: llmError instanceof Error ? llmError.name : 'Unknown',
      });

      // Continue with fallback title instead of failing
      title = { title: 'New Analysis' };
    }

    const chatId = runtimeContext.get('chatId');
    const messageId = runtimeContext.get('messageId');

    // Run database updates concurrently
    const updatePromises: Promise<{ success: boolean }>[] = [];

    if (chatId) {
      updatePromises.push(
        updateChat(chatId, {
          title: title.title,
        })
      );
    }

    if (messageId) {
      updatePromises.push(
        updateMessage(messageId, {
          title: title.title,
        })
      );
    }

    await Promise.all(updatePromises);

    return {
      ...title,
      dashboardFiles: inputData.dashboardFiles, // Pass through dashboard context
    };
  } catch (error) {
    // Handle AbortError gracefully
    if (error instanceof Error && error.name === 'AbortError') {
      // Return a fallback title when aborted
      return {
        title: 'New Analysis',
        dashboardFiles: inputData.dashboardFiles, // Pass through dashboard context
      };
    }

    console.error('[GenerateChatTitle] Failed to generate chat title:', error);
    // Return a fallback title instead of crashing
    return {
      title: 'New Analysis',
      dashboardFiles: inputData.dashboardFiles, // Pass through dashboard context
    };
  }
};

export const generateChatTitleStep = createStep({
  id: 'generate-chat-title',
  description: 'This step is a single llm call to quickly generate a title for the chat.',
  inputSchema,
  outputSchema: generateChatTitleOutputSchema,
  execute: generateChatTitleExecution,
});
