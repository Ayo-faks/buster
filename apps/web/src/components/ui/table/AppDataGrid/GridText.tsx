import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/classMerge';

export const Text: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <span className={cn('text-text-default text-base', className)}>{children}</span>;
};
