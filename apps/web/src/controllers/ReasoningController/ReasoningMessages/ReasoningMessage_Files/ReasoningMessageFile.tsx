import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo } from 'react';
import type {
  BusterChatMessage,
  BusterChatMessageReasoning_files,
} from '@/api/asset_interfaces/chat';
import { useGetChatMessage } from '@/api/buster_rest/chats';
import { ReasoningFileCode } from '@/components/features/reasoning/ReasoningFileCode';
import { ReasoningFileButtons } from './ReasoningFileButtons';
import { StreamingMessageStatus } from './StreamingMessageStatus';

export type ReasoningMessageFileProps = {
  chatId: string;
  fileId: string;
  messageId: string;
  reasoningMessageId: string;
  isStreamFinished: boolean;
};

export const ReasoningMessage_File: React.FC<ReasoningMessageFileProps> = React.memo(
  ({ isStreamFinished, fileId, chatId, messageId, reasoningMessageId }) => {
    const { data: file } = useGetChatMessage(messageId, {
      select: useCallback(
        (x: BusterChatMessage) =>
          (x?.reasoning_messages[reasoningMessageId] as BusterChatMessageReasoning_files)?.files?.[
            fileId
          ],
        [reasoningMessageId, fileId]
      ),
      notifyOnChangeProps: ['data'],
    });

    const { status, file_type, id, version_number } = file || {};

    const buttons = useMemo(() => {
      if (!file || !status || !file_type || !id) return null;

      return !isStreamFinished || status === 'failed' ? (
        <StreamingMessageStatus status={status} fileType={file_type} />
      ) : (
        <ReasoningFileButtons
          fileType={file_type}
          chatId={chatId}
          fileId={id}
          versionNumber={version_number}
          type="file"
        />
      );
    }, [isStreamFinished, status, file_type, chatId, id, version_number]);

    const collapsible: 'overlay-peek' | false = useMemo(() => {
      if (file_type === 'agent-action') return 'overlay-peek';
      return false;
    }, [file_type]);

    if (isEmpty(file)) {
      return null;
    }

    return (
      <ReasoningFileCode
        {...file}
        collapsible={collapsible}
        buttons={buttons}
        isStreamFinished={isStreamFinished}
      />
    );
  }
);

ReasoningMessage_File.displayName = 'ReasoningMessage_File';
