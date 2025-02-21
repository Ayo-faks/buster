import React from 'react';
import { iconProps } from './iconProps';

function wrench(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '18px wrench';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M11.75,16.25v-2.644c2.071-1.018,3.5-3.143,3.5-5.606,0-2.657-1.661-4.922-4-5.826V7.25c0,.552-.448,1-1,1h-2.5c-.552,0-1-.448-1-1V2.174c-2.339,.904-4,3.168-4,5.826,0,2.463,1.429,4.588,3.5,5.606v2.644"
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

export default wrench;
