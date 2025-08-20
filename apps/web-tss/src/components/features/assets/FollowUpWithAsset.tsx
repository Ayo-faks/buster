import type { ShareAssetType } from '@buster/server-shared/share';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useStartChatFromAsset } from '@/api/buster_rest/chats';
import { useMemoizedFn } from '@/hooks/useMemoizedFn';
import { assetParamsToRoute } from '../../../lib/assets/assetParamsToRoute';
import { InputCard } from '../../ui/card/InputCard';
import { Popover, type PopoverProps } from '../../ui/popover';
import { AppTooltip } from '../../ui/tooltip';

type FollowUpWithAssetProps = {
  assetType: Exclude<ShareAssetType, 'chat' | 'collection'>;
  assetId: string;
  children: React.ReactNode;
  side?: PopoverProps['side'];
  align?: PopoverProps['align'];
  placeholder?: string;
  buttonText?: string;
};

export const FollowUpWithAssetContent: React.FC<{
  assetType: Exclude<ShareAssetType, 'chat' | 'collection'>;
  assetId: string;
  placeholder?: string;
  buttonText?: string;
}> = React.memo(
  ({
    assetType,
    assetId,
    placeholder = 'Describe the filter you want to apply',
    buttonText = 'Apply custom filter',
  }) => {
    const navigate = useNavigate();
    const { mutateAsync: startChatFromAsset, isPending } = useStartChatFromAsset();

    const transformPrompt = useMemoizedFn((userPrompt: string): string => {
      if (assetType === 'dashboard') {
        return `Hey Buster. Please recreate this dashboard applying this filter to the metrics on the dashboard: ${userPrompt}`;
      }

      if (assetType === 'metric') {
        return `Hey Buster. Can you filter or drill down into this metric based on the following request: ${userPrompt}`;
      }

      return userPrompt;
    });

    const onSubmit = useMemoizedFn(async (prompt: string) => {
      if (!prompt || !assetId || !assetType || isPending) return;

      const res = await startChatFromAsset({
        asset_id: assetId,
        asset_type: assetType,
        prompt: transformPrompt(prompt),
      });

      const link = assetParamsToRoute({
        assetType,
        assetId,
        chatId: res.id,
      });

      await navigate(link);
    });

    return (
      <InputCard
        placeholder={placeholder}
        buttonText={buttonText}
        onSubmit={onSubmit}
        loading={isPending}
        className="border-none"
      />
    );
  }
);
FollowUpWithAssetContent.displayName = 'FollowUpWithAssetContent';

export const FollowUpWithAssetPopup: React.FC<FollowUpWithAssetProps> = React.memo(
  ({ assetType, assetId, side = 'bottom', align = 'end', children, placeholder, buttonText }) => {
    return (
      <Popover
        side={side}
        align={align}
        className="p-0"
        content={
          <FollowUpWithAssetContent
            assetType={assetType}
            assetId={assetId}
            placeholder={placeholder}
            buttonText={buttonText}
          />
        }
      >
        <AppTooltip title="Apply custom filter">{children}</AppTooltip>
      </Popover>
    );
  }
);

FollowUpWithAssetPopup.displayName = 'FollowUpWithAssetPopup';
