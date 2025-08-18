import React from 'react';
import { cn } from '@/lib/classMerge';

interface ShimmerLoadingTextProps {
  text: string;
  colors?: string[];
  duration?: number;
  fontSize?: number;
  className?: string;
}

export const ShimmerLoadingText: React.FC<ShimmerLoadingTextProps> = React.memo(
  ({
    text,
    colors = ['var(--color-foreground)', 'var(--color-text-tertiary)'],
    duration = 2.5,
    fontSize = 13,
    className = '',
  }) => {
    if (colors.length < 2) {
      throw new Error('ShimmerText requires at least 2 colors');
    }

    return (
      <div
        className={cn('pulse-colors inline-block', className)}
        style={
          {
            fontSize: fontSize,
            animationDuration: `${duration}s`,
            '--pulse-color-1': colors[0],
            '--pulse-color-2': colors[1],
          } as React.CSSProperties & { '--pulse-color-1': string; '--pulse-color-2': string }
        }
      >
        {text}
      </div>
    );
  }
);

ShimmerLoadingText.displayName = 'ShimmerLoadingText';
