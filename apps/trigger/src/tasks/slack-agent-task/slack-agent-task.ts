import {
  chats,
  checkForDuplicateMessages,
  db,
  eq,
  messages,
  updateMessage,
} from '@buster/database';
import {
  SlackMessagingService,
  addReaction,
  convertMarkdownToSlack,
  getThreadMessages,
  removeReaction,
} from '@buster/slack';
import { type TaskOutput, logger, runs, schemaTask, wait } from '@trigger.dev/sdk';
import { z } from 'zod';
import { analystAgentTask } from '../analyst-agent-task/analyst-agent-task';
import {
  createMessage,
  filterMessagesAfterLastMention,
  getChatDetails,
  getOrganizationSlackIntegration,
} from './helpers';

const SlackAgentTaskInputSchema = z.object({
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
});

const SlackAgentTaskOutputSchema = z.object({
  success: z.boolean(),
  messageId: z.string().uuid(),
  triggerRunId: z.string(),
});

export type SlackAgentTaskInput = z.infer<typeof SlackAgentTaskInputSchema>;
export type SlackAgentTaskOutput = z.infer<typeof SlackAgentTaskOutputSchema>;

export const slackAgentTask: ReturnType<
  typeof schemaTask<'slack-agent-task', typeof SlackAgentTaskInputSchema, SlackAgentTaskOutput>
> = schemaTask<'slack-agent-task', typeof SlackAgentTaskInputSchema, SlackAgentTaskOutput>({
  id: 'slack-agent-task',
  schema: SlackAgentTaskInputSchema,
  maxDuration: 600, // needs to be the same or longer than the analyst agent task since we wait for it to complete.
  run: async (payload: SlackAgentTaskInput): Promise<SlackAgentTaskOutput> => {
    try {
      logger.log('Starting Slack agent task', {
        chatId: payload.chatId,
        userId: payload.userId,
      });

      // Step 1: Get chat details first (we need this for everything else)
      const chatDetails = await getChatDetails(payload.chatId);

      if (!chatDetails.slackChannelId || !chatDetails.slackThreadTs) {
        throw new Error('Chat is missing Slack channel or thread information');
      }

      logger.log('Retrieved chat details', {
        chatId: payload.chatId,
        organizationId: chatDetails.organizationId,
        slackChannelId: chatDetails.slackChannelId,
        slackThreadTs: chatDetails.slackThreadTs,
        slackChatAuthorization: chatDetails.chat.slackChatAuthorization,
      });

      // Step 2: Get Slack integration for access token
      const { integration, accessToken } = await getOrganizationSlackIntegration(
        chatDetails.organizationId
      );

      // Check if user is unauthorized
      if (chatDetails.chat.slackChatAuthorization === 'unauthorized') {
        logger.log('User is unauthorized, sending message to Slack thread');

        const messagingService = new SlackMessagingService();
        const unauthorizedMessage = {
          text: "It looks like you haven't been added to this Buster workspace. One of your workspace admins will need to add you before you can send requests.",
          thread_ts: chatDetails.slackThreadTs,
        };

        try {
          await messagingService.sendMessage(
            accessToken,
            chatDetails.slackChannelId,
            unauthorizedMessage
          );
          logger.log('Sent unauthorized message to Slack thread');
        } catch (error) {
          logger.error('Failed to send unauthorized message to Slack', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }

        // Return early - don't process the request
        return {
          success: false,
          messageId: '',
          triggerRunId: '',
        };
      }

      logger.log('Retrieved Slack integration', {
        organizationId: chatDetails.organizationId,
        teamId: integration.teamId,
        teamName: integration.teamName,
        botUserId: integration.botUserId,
      });

      // Step 3: Fetch all needed data concurrently
      const [slackMessages] = await Promise.all([
        getThreadMessages({
          accessToken,
          channelId: chatDetails.slackChannelId,
          threadTs: chatDetails.slackThreadTs,
        }),
        // Add more concurrent fetches here if needed
      ]);

      logger.log('Retrieved Slack thread messages', {
        messageCount: slackMessages.length,
        hasParentMessage: slackMessages.length > 0,
      });

      // Filter messages to only include non-bot messages after the most recent app mention
      if (!integration.botUserId) {
        logger.error('No bot user ID found for Slack integration');
        throw new Error('Slack integration is missing bot user ID');
      }

      const { filteredMessages: relevantMessages, mentionMessageTs } =
        filterMessagesAfterLastMention(slackMessages, integration.botUserId);

      logger.log('Filtered relevant messages', {
        originalCount: slackMessages.length,
        filteredCount: relevantMessages.length,
        botUserId: integration.botUserId,
        mentionMessageTs,
      });

      // If no mention was found, we can't proceed
      if (!mentionMessageTs) {
        logger.error('No @Buster mention found in thread');
        throw new Error('No @Buster mention found in the thread');
      }

      // Find all bot messages in the thread to determine if this is a follow-up
      const previousBotMessages = slackMessages.filter(
        (msg) => msg.user === integration.botUserId && msg.ts < mentionMessageTs
      );
      const isFollowUp = previousBotMessages.length > 0;

      // Get all messages for context, not just after the mention
      let messagesToInclude: typeof slackMessages;

      if (isFollowUp) {
        // Find the timestamp of the last bot message before the current mention
        const lastBotMessageTs = Math.max(
          ...previousBotMessages.map((msg) => Number.parseFloat(msg.ts))
        );
        const lastBotMessageIndex = slackMessages.findIndex(
          (msg) => Number.parseFloat(msg.ts) === lastBotMessageTs
        );

        // Include messages after the last bot response
        messagesToInclude = slackMessages.slice(lastBotMessageIndex + 1);
      } else {
        // Include all messages in the thread for first request
        messagesToInclude = slackMessages;
      }

      // Filter out bot messages and format the conversation
      const formattedMessages = messagesToInclude
        .filter((msg) => msg.user !== integration.botUserId) // Exclude bot messages
        .map((msg) => {
          let text = msg.text || '';
          // Replace bot user ID mentions with @Buster
          if (integration.botUserId) {
            text = text.replace(new RegExp(`<@${integration.botUserId}>`, 'g'), '@Buster');
          }
          return `> ${text}`;
        })
        .filter((text) => text.trim() !== '>')
        .join('\n');

      // Check if no messages found - reply directly to Slack
      if (!formattedMessages.trim()) {
        logger.log('No messages found after filtering, responding directly to Slack');

        const messagingService = new SlackMessagingService();

        try {
          const noRequestMessage = {
            text: "I couldn't find any requests in this conversation. Please send me a message with your question or request.",
            thread_ts: chatDetails.slackThreadTs,
          };

          await messagingService.sendMessage(
            accessToken,
            chatDetails.slackChannelId,
            noRequestMessage
          );

          logger.log('Sent no requests message to Slack thread');
        } catch (error) {
          logger.error('Failed to send no requests message to Slack', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }

        // Update reactions - remove hourglass, add X mark on the mention message
        try {
          // Remove the hourglass reaction
          await removeReaction({
            accessToken,
            channelId: chatDetails.slackChannelId,
            messageTs: mentionMessageTs,
            emoji: 'hourglass_flowing_sand',
          });

          // Add the X mark reaction to indicate no request found
          await addReaction({
            accessToken,
            channelId: chatDetails.slackChannelId,
            messageTs: mentionMessageTs,
            emoji: 'x',
          });

          logger.log('Updated Slack reactions on mention message (no request found)', {
            messageTs: mentionMessageTs,
          });
        } catch (error) {
          logger.warn('Failed to update Slack reactions for no request case', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }

        return {
          success: true,
          messageId: '',
          triggerRunId: '',
        };
      }

      // Generate prompt based on whether it's first message or follow-up
      let prompt: string;
      if (isFollowUp) {
        prompt = `Please fulfill the request from this slack conversation. Here are the messages since your last response:\n${formattedMessages}`;
      } else {
        prompt = `Please fulfill the request from this slack conversation:\n${formattedMessages}`;
      }

      // Check for duplicate messages before creating
      const duplicateCheck = await checkForDuplicateMessages({
        chatId: payload.chatId,
        requestMessage: prompt,
      });

      if (duplicateCheck.isDuplicate) {
        logger.warn('Duplicate message detected, stopping task', {
          chatId: payload.chatId,
          duplicateMessageIds: duplicateCheck.duplicateMessageIds,
          requestMessage: prompt,
        });

        return {
          success: false,
          messageId: '',
          triggerRunId: '',
        };
      }

      // Step 4: Create message
      const message = await createMessage({
        chatId: payload.chatId,
        userId: payload.userId,
        content: prompt,
      });

      logger.log('Successfully created message', {
        chatId: payload.chatId,
        messageId: message.id,
      });

      // Step 5: Trigger analyst agent task (without waiting)
      logger.log('Triggering analyst agent task', {
        messageId: message.id,
      });

      const analystHandle = await analystAgentTask.trigger(
        {
          message_id: message.id,
        },
        {
          concurrencyKey: payload.chatId, // Ensure sequential processing per chat
        }
      );

      logger.log('Analyst agent task triggered', {
        runId: analystHandle.id,
      });

      // Check if the analyst task is queued (another task is already running for this chat)
      try {
        const runStatus = await runs.retrieve(analystHandle.id);

        if (runStatus.status === 'QUEUED') {
          logger.log('Analyst task is queued, notifying user', {
            runId: analystHandle.id,
            status: runStatus.status,
          });

          // Send a message to Slack indicating the task is queued
          const messagingService = new SlackMessagingService();
          try {
            const queuedMessage = {
              text: "It looks like I'm still running your previous request. When that finishes I'll start working on this one!",
              thread_ts: chatDetails.slackThreadTs,
            };

            await messagingService.sendMessage(
              accessToken,
              chatDetails.slackChannelId,
              queuedMessage
            );

            logger.log('Sent queued message to Slack thread');
          } catch (error) {
            logger.warn('Failed to send queued message to Slack', {
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        }
      } catch (error) {
        logger.warn('Failed to check run status', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Update the message with the trigger run ID
      if (!analystHandle.id) {
        throw new Error('Trigger service returned invalid handle');
      }

      try {
        await updateMessage(message.id, {
          triggerRunId: analystHandle.id,
        });

        logger.log('Updated message with trigger run ID', {
          messageId: message.id,
          triggerRunId: analystHandle.id,
        });
      } catch (updateError) {
        logger.error('Failed to update message with trigger run ID', {
          messageId: message.id,
          triggerRunId: analystHandle.id,
          error: updateError instanceof Error ? updateError.message : 'Unknown error',
        });
        // Don't throw here - continue with the flow since the task is already triggered
      }

      // Step 6: Send initial Slack message immediately after triggering
      const messagingService = new SlackMessagingService();
      const busterUrl = process.env.BUSTER_URL || 'https://platform.buster.so';
      let progressMessageTs: string | undefined;

      try {
        const progressMessage = {
          text: "I've started working on your request. I'll notify you when it's finished.",
          thread_ts: chatDetails.slackThreadTs,
          blocks: [
            {
              type: 'section' as const,
              text: {
                type: 'mrkdwn' as const,
                text: "I've started working on your request. I'll notify you when it's finished.",
              },
            },
            {
              type: 'actions' as const,
              elements: [
                {
                  type: 'button' as const,
                  text: {
                    type: 'plain_text' as const,
                    text: 'Open in Buster',
                    emoji: false,
                  },
                  url: `${busterUrl}/app/chats/${payload.chatId}`,
                },
              ],
            },
          ],
        };

        const sendResult = await messagingService.sendMessage(
          accessToken,
          chatDetails.slackChannelId,
          progressMessage
        );

        if (sendResult.success && sendResult.messageTs) {
          progressMessageTs = sendResult.messageTs;
          logger.log('Sent progress message to Slack thread', { messageTs: progressMessageTs });
        }
      } catch (error) {
        // Log but don't fail the task if we can't send the progress message
        logger.warn('Failed to send progress message to Slack', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Step 7: Poll for analyst task completion
      let isComplete = false;
      let analystResult: { ok: boolean; output?: unknown; error?: unknown } | null = null;
      const maxPollingTime = 30 * 60 * 1000; // 30 minutes
      const initialPollingInterval = 20000; // 20 seconds for first wait
      const subsequentPollingInterval = 10000; // 10 seconds for subsequent waits
      const startTime = Date.now();
      let isFirstPoll = true;

      while (!isComplete && Date.now() - startTime < maxPollingTime) {
        // Wait with different intervals: 20s for first poll, 10s for subsequent polls
        const currentInterval = isFirstPoll ? initialPollingInterval : subsequentPollingInterval;
        await wait.for({ seconds: currentInterval / 1000 });
        isFirstPoll = false;

        try {
          const run = await runs.retrieve(analystHandle.id);

          logger.log('Polling analyst task status', {
            runId: analystHandle.id,
            status: run.status,
          });

          if (run.status === 'COMPLETED') {
            isComplete = true;
            analystResult = { ok: true, output: run.output };
          } else if (
            run.status === 'SYSTEM_FAILURE' ||
            run.status === 'CRASHED' ||
            run.status === 'CANCELED' ||
            run.status === 'TIMED_OUT' ||
            run.status === 'INTERRUPTED'
          ) {
            isComplete = true;
            analystResult = { ok: false, error: run.error || 'Task failed' };
          }
        } catch (error) {
          logger.warn('Failed to retrieve run status', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      // Check if we timed out
      if (!isComplete) {
        logger.error('Analyst task polling timed out');
        analystResult = { ok: false, error: 'Task timed out' };
      }

      // Handle analyst task result
      if (!analystResult || !analystResult.ok) {
        // If analyst task failed, notify the user
        logger.error('Analyst agent task failed', {
          error: analystResult?.error || 'Unknown error',
        });

        try {
          await messagingService.sendMessage(accessToken, chatDetails.slackChannelId, {
            text: `Sorry, I encountered an error while processing your request. Please try again or contact support if the issue persists.`,
            thread_ts: chatDetails.slackThreadTs,
          });
        } catch (error) {
          logger.warn('Failed to send error message to Slack', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }

        throw new Error(
          `Analyst agent task failed: ${JSON.stringify(analystResult?.error || 'Unknown error')}`
        );
      }

      // Step 8: Fetch the response message and chat details from the database
      let responseText = "I've finished working on your request!";
      let chatFileInfo: {
        mostRecentFileId: string | null;
        mostRecentFileType: string | null;
        mostRecentVersionNumber: number | null;
      } | null = null;

      try {
        // Fetch both message and chat data in parallel
        const [messageData, chatData] = await Promise.all([
          db
            .select({ responseMessages: messages.responseMessages })
            .from(messages)
            .where(eq(messages.id, message.id))
            .limit(1),
          db
            .select({
              mostRecentFileId: chats.mostRecentFileId,
              mostRecentFileType: chats.mostRecentFileType,
              mostRecentVersionNumber: chats.mostRecentVersionNumber,
            })
            .from(chats)
            .where(eq(chats.id, payload.chatId))
            .limit(1),
        ]);

        const messageRecord = messageData[0];
        const chatRecord = chatData[0];

        if (messageRecord?.responseMessages) {
          // responseMessages is a JSON array, find the text message with is_final_message: true
          const responseArray = messageRecord.responseMessages as Array<{
            id: string;
            type: string;
            message?: string;
            is_final_message?: boolean;
          }>;

          const finalTextMessage = responseArray.find(
            (msg) => msg.type === 'text' && msg.is_final_message === true
          );

          if (finalTextMessage?.message) {
            responseText = finalTextMessage.message;
          }
        }

        if (chatRecord) {
          chatFileInfo = {
            mostRecentFileId: chatRecord.mostRecentFileId,
            mostRecentFileType: chatRecord.mostRecentFileType,
            mostRecentVersionNumber: chatRecord.mostRecentVersionNumber,
          };
        }
      } catch (error) {
        logger.warn('Failed to fetch data from database', {
          messageId: message.id,
          chatId: payload.chatId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Step 9: Delete the initial message and send a new one with the response
      if (progressMessageTs) {
        try {
          // First, delete the initial message
          const deleteResult = await messagingService.deleteMessage(
            accessToken,
            chatDetails.slackChannelId,
            progressMessageTs
          );

          if (deleteResult.success) {
            logger.log('Deleted initial progress message', {
              messageTs: progressMessageTs,
            });
          } else {
            logger.warn('Failed to delete initial message', {
              messageTs: progressMessageTs,
              error: deleteResult.error,
            });
          }
        } catch (error) {
          logger.warn('Error deleting initial message', {
            messageTs: progressMessageTs,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      // Send the completion message (whether or not the delete succeeded)
      try {
        // Construct the URL based on whether we have file information
        let buttonUrl = `${busterUrl}/app/chats/${payload.chatId}`;

        if (
          chatFileInfo?.mostRecentFileId &&
          chatFileInfo?.mostRecentFileType &&
          chatFileInfo?.mostRecentVersionNumber !== null
        ) {
          buttonUrl = `${busterUrl}/app/chats/${payload.chatId}/${chatFileInfo.mostRecentFileType}s/${chatFileInfo.mostRecentFileId}?${chatFileInfo.mostRecentFileType}_version_number=${chatFileInfo.mostRecentVersionNumber}`;
        }

        // Convert markdown to Slack format
        const convertedResponse = convertMarkdownToSlack(responseText);

        // Create the message with converted text and any blocks from conversion
        const messageBlocks = [...(convertedResponse.blocks || [])];

        // If no blocks were created from conversion, create a section block with the converted text
        if (messageBlocks.length === 0 && convertedResponse.text) {
          messageBlocks.push({
            type: 'section' as const,
            text: {
              type: 'mrkdwn' as const,
              text: convertedResponse.text,
            },
          });
        }

        // Add the action button block
        messageBlocks.push({
          type: 'actions' as const,
          elements: [
            {
              type: 'button' as const,
              text: {
                type: 'plain_text' as const,
                text: 'Open in Buster',
                emoji: false,
              },
              url: buttonUrl,
            },
          ],
        });

        const completionMessage = {
          text: convertedResponse.text || responseText, // Use converted text as fallback
          thread_ts: chatDetails.slackThreadTs,
          blocks: messageBlocks,
        };

        await messagingService.sendMessage(
          accessToken,
          chatDetails.slackChannelId,
          completionMessage
        );

        logger.log('Sent completion message to Slack thread', {
          buttonUrl,
          hasFileInfo: !!chatFileInfo?.mostRecentFileId,
        });
      } catch (error) {
        logger.error('Failed to send completion message to Slack', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Step 10: Update reactions - remove hourglass, add checkmark on the mention message
      try {
        // Remove the hourglass reaction
        await removeReaction({
          accessToken,
          channelId: chatDetails.slackChannelId,
          messageTs: mentionMessageTs,
          emoji: 'hourglass_flowing_sand',
        });

        // Add the checkmark reaction
        await addReaction({
          accessToken,
          channelId: chatDetails.slackChannelId,
          messageTs: mentionMessageTs,
          emoji: 'white_check_mark',
        });

        logger.log('Updated Slack reactions on mention message', {
          messageTs: mentionMessageTs,
        });
      } catch (error) {
        logger.warn('Failed to update Slack reactions', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      return {
        success: true,
        messageId: message.id,
        triggerRunId: analystHandle.id,
      };
    } catch (error) {
      logger.error('Failed to process Slack agent task', {
        chatId: payload.chatId,
        userId: payload.userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  },
});
