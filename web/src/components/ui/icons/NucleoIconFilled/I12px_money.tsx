import React from 'react';

import { iconProps } from './iconProps';

function I12px_money(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '12px money';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <circle cx="6" cy="6" fill={secondaryfill} r="2" strokeWidth="0" />
        <path
          d="m9.25,1H2.75C1.233,1,0,2.233,0,3.75v4.5c0,1.517,1.233,2.75,2.75,2.75h6.5c1.517,0,2.75-1.233,2.75-2.75V3.75c0-1.517-1.233-2.75-2.75-2.75Zm-.894,8.5H3.644c-.272-1.051-1.093-1.872-2.144-2.144v-2.712c1.051-.272,1.872-1.093,2.144-2.144h4.712c.272,1.051,1.093,1.872,2.144,2.144v2.712c-1.051.272-1.872,1.093-2.144,2.144Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default I12px_money;
