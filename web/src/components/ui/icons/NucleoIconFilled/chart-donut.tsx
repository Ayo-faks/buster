import React from 'react';

import { iconProps } from './iconProps';

function chartDonut(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'chart donut';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9.75,1.038V5.076c1.604,.306,2.868,1.57,3.174,3.174h4.038c-.357-3.813-3.399-6.855-7.212-7.212Z"
          fill={secondaryfill}
        />
        <path
          d="M5,9c0-1.949,1.402-3.572,3.25-3.924V1.038C4.19,1.418,1,4.842,1,9c0,1.936,.692,3.713,1.841,5.099l2.853-2.853c-.437-.641-.693-1.414-.693-2.246Z"
          fill={fill}
        />
        <path
          d="M9,13c-.832,0-1.605-.257-2.246-.693l-2.853,2.853c1.385,1.149,3.163,1.841,5.099,1.841,4.158,0,7.582-3.189,7.962-7.25h-4.038c-.353,1.848-1.975,3.25-3.924,3.25Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default chartDonut;
