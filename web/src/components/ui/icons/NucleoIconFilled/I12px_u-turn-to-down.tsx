import React from 'react';

import { iconProps } from './iconProps';

function I12px_uTurnToDown(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || '12px u turn to down';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m6.75,11.5c-.414,0-.75-.336-.75-.75V3.75c0-.965-.785-1.75-1.75-1.75s-1.75.785-1.75,1.75v1.25c0,.414-.336.75-.75.75s-.75-.336-.75-.75v-1.25C1,1.958,2.458.5,4.25.5s3.25,1.458,3.25,3.25v7c0,.414-.336.75-.75.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m6.75,11.75c-.192,0-.384-.073-.53-.22l-3.25-3.25c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l2.72,2.72,2.72-2.72c.293-.293.768-.293,1.061,0s.293.768,0,1.061l-3.25,3.25c-.146.146-.338.22-.53.22Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default I12px_uTurnToDown;
