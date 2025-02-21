import React from 'react';

import { iconProps } from './iconProps';

function chartPie2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'chart pie 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9.75,1.038V7.326L14.436,3.147c-1.256-1.168-2.883-1.941-4.686-2.109Z"
          fill={secondaryfill}
        />
        <path
          d="M9.992,9.12l4.133,6.015c1.755-1.469,2.875-3.673,2.875-6.135,0-1.772-.586-3.406-1.566-4.734l-5.442,4.854Z"
          fill={fill}
        />
        <path
          d="M8.358,9.389c-.066-.112-.108-.25-.108-.389V1.038C4.19,1.418,1,4.842,1,9c0,4.411,3.589,8,8,8,1.411,0,2.737-.371,3.889-1.015l-4.507-6.56c-.013-.02-.024-.036-.024-.036Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default chartPie2;
