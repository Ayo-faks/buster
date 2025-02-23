import React from 'react';

import { iconProps } from './iconProps';

function I12px_msg(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || '12px msg';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m6,.001C2.691.001,0,2.693,0,6.001c0,1.08.287,2.127.833,3.049-.178.64-.422,1.247-.744,1.846-.124.232-.118.513.018.739.136.228.379.405.647.365,1.093,0,2.077-.163,2.932-.483.752.321,1.529.483,2.314.483,3.309,0,6-2.691,6-6S9.309.001,6,.001Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default I12px_msg;
