import React from 'react';
import { cn } from '@/lib/classMerge';
import { Text } from '../typography/Text';
import { Avatar } from './Avatar';

export const AvatarUserButton = React.forwardRef<
  HTMLDivElement,
  {
    username?: string | null;
    avatarUrl?: string | null | React.ReactNode;
    email?: string | null;
    className?: string;
    avatarSize?: number;
  }
>(({ username, avatarUrl, email, className, avatarSize = 28 }, ref) => {
  const isSameEmailName = email === username;

  return (
    <div ref={ref} className={cn('flex w-full items-center gap-x-2 rounded-md p-1', className)}>
      {typeof avatarUrl === 'string' || avatarUrl === null ? (
        <Avatar size={avatarSize} fallbackClassName="text-base" image={avatarUrl} name={username} />
      ) : (
        avatarUrl
      )}
      <div className="flex w-full flex-col gap-y-0 overflow-hidden">
        <Text truncate className="flex-grow">
          {username}
        </Text>
        {!isSameEmailName && email && (
          <Text truncate size={'sm'} variant={'secondary'}>
            {email}
          </Text>
        )}
      </div>
    </div>
  );
});

AvatarUserButton.displayName = 'AvatarUserButton';
