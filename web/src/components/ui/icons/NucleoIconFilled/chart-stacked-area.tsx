import React from 'react';

import { iconProps } from './iconProps';

function chartStackedArea(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'chart stacked area';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M16.332,2.596c-.414-.218-.908-.187-1.292,.078l-6.041,4.167-3.23-2.221c-.5-.345-1.168-.281-1.593,.145L1.366,7.573c-.232,.232-.366,.555-.366,.884v3.793c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V3.702c0-.466-.256-.89-.668-1.106ZM5.089,5.972l3.203,2.202c.423,.291,.994,.291,1.417-.002l5.791-3.994v4.32l-6.392,2.645-3.369-2.526c-.431-.325-1.018-.336-1.462-.029l-1.777,1.23v-1.258l2.589-2.589Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default chartStackedArea;
