import React from 'react';

import { iconProps } from './iconProps';

function squareNut(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'square nut';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.25,2H4.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75Zm-.25,8.309c0,.622-.334,1.202-.872,1.514l-2.25,1.305c-.271,.157-.574,.235-.878,.235s-.607-.079-.878-.235l-2.25-1.305c-.538-.312-.872-.892-.872-1.514v-2.618c0-.622,.334-1.202,.872-1.514l2.25-1.305c.541-.313,1.215-.313,1.756,0l2.25,1.305c.538,.312,.872,.892,.872,1.514v2.618Z"
          fill={fill}
        />
        <circle cx="9" cy="9" fill={secondaryfill} r="1.25" />
      </g>
    </svg>
  );
}

export default squareNut;
