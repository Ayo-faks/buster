import React from 'react';
import { iconProps } from './iconProps';

function folder3(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '18px folder 3';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.75,5.75c0-.552-.448-1-1-1H7.75l-.956-1.53c-.183-.292-.503-.47-.848-.47H3.25c-.552,0-1,.448-1,1V13.5c0,.966,.784,1.75,1.75,1.75"
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M4,15.25c.966,0,1.75-.784,1.75-1.75v-4.25c0-.552,.448-1,1-1H14.75c.552,0,1,.448,1,1v4c0,1.105-.895,2-2,2H4Z"
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

export default folder3;
