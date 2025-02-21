import React from 'react';

import { iconProps } from './iconProps';

function I12px_circleCopy(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '12px circle copy';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m1.339,7.25c-.249,0-.492-.123-.635-.349-.461-.728-.704-1.558-.704-2.401C0,2.019,2.019,0,4.5,0c.844,0,1.675.244,2.401.705.35.222.454.685.232,1.035-.222.35-.686.455-1.035.232-.486-.308-1.039-.471-1.599-.471-1.654,0-3,1.346-3,3,0,.559.163,1.111.472,1.598.222.35.117.813-.232,1.035-.124.079-.264.116-.4.116Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <circle cx="7.5" cy="7.5" fill={fill} r="4.5" strokeWidth="0" />
      </g>
    </svg>
  );
}

export default I12px_circleCopy;
