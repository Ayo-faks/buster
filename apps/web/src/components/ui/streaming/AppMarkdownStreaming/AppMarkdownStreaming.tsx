'use client';

import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { cn } from '@/lib/classMerge';
import { useMarkdownStreaming } from './useMarkdownStreaming';
import type {
  MarkdownAnimation,
  MarkdownAnimationTimingFunction
} from '../../typography/animation-common';
import AnimatedMarkdown from '../../typography/AnimatedMarkdown/AnimatedMarkdown';

const AppMarkdownStreaming = ({
  content,
  isStreamFinished,
  animation = 'blurIn',
  animationDuration = 300,
  animationTimingFunction = 'linear',
  className,
  stripFormatting = true
}: {
  content: string;
  isStreamFinished: boolean;
  animation?: MarkdownAnimation;
  animationDuration?: number;
  animationTimingFunction?: MarkdownAnimationTimingFunction;
  className?: string;
  stripFormatting?: boolean;
}) => {
  const { blockMatches, isFinished } = useMarkdownStreaming({
    content,
    isStreamFinished
  });

  // When the upstream stream and the throttled streaming are finished, render a single
  // non-streaming markdown to unmount streaming components and release memory.
  if (isStreamFinished && isFinished) {
    return (
      <div className={cn('flex flex-col space-y-2.5', className)}>
        <AnimatedMarkdown
          content={content}
          isStreamFinished={isFinished}
          animation={animation}
          animationDuration={animationDuration}
          animationTimingFunction={animationTimingFunction}
          stripFormatting={stripFormatting}
        />
      </div>
    );
  }

  return (
    <AppMarkdownStreamingContext.Provider
      value={{
        animation,
        animationDuration,
        animationTimingFunction,
        isStreamFinished,
        isThrottleStreamingFinished: isFinished,
        stripFormatting
      }}>
      <div className={cn('flex flex-col space-y-2.5', className)}>
        {blockMatches.map((blockMatch, index) => {
          const Component = blockMatch.block.component;
          return <Component key={index} blockMatch={blockMatch} />;
        })}
      </div>
    </AppMarkdownStreamingContext.Provider>
  );
};

export default AppMarkdownStreaming;

type AppMarkdownStreamingContextValue = {
  animation?: MarkdownAnimation;
  animationDuration?: number;
  animationTimingFunction?: MarkdownAnimationTimingFunction;
  isStreamFinished: boolean;
  isThrottleStreamingFinished: boolean;
  stripFormatting: boolean;
};

const AppMarkdownStreamingContext = createContext<AppMarkdownStreamingContextValue>({
  animation: 'fadeIn',
  animationDuration: 700,
  animationTimingFunction: 'ease-in-out',
  isStreamFinished: false,
  isThrottleStreamingFinished: false,
  stripFormatting: true
});

export const useAppMarkdownStreaming = <T,>(
  selector: (ctx: AppMarkdownStreamingContextValue) => T
) => useContextSelector(AppMarkdownStreamingContext, selector);
