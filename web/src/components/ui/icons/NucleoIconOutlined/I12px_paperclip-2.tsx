import React from 'react';
import { iconProps } from './iconProps';

function I12px_paperclip2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '12px';
  const title = props.title || '12px paperclip 2';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m7.026,3.705l-2.746,2.746c-.506.506-.506,1.325,0,1.831h0c.506.506,1.325.506,1.831,0l3.112-3.112c1.011-1.011,1.011-2.65,0-3.661h0c-1.011-1.011-2.65-1.011-3.661,0l-3.112,3.112c-1.517,1.517-1.517,3.975,0,5.492h0c1.517,1.517,3.975,1.517,5.492,0l2.746-2.746"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default I12px_paperclip2;
