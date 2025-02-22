import React from 'react';
import { iconProps } from './iconProps';

function patches(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || '18px patches';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,3.697l-.861-.861c-.781-.781-2.047-.781-2.828,0l-2.475,2.475c-.781,.781-.781,2.047,0,2.828l.861,.861"
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M14.303,9l.861,.861c.781,.781,.781,2.047,0,2.828l-2.475,2.475c-.781,.781-2.047,.781-2.828,0l-.861-.861"
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M11.652,11.652l3.513-3.513c.781-.781,.781-2.047,0-2.828l-2.475-2.475c-.781-.781-2.047-.781-2.828,0l-3.513,3.513-3.513,3.513c-.781,.781-.781,2.047,0,2.828l2.475,2.475c.781,.781,2.047,.781,2.828,0,0,0,3.513-3.513,3.513-3.513Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <circle cx="9.25" cy="6.75" fill={secondaryfill} r=".75" />
        <circle cx="11.25" cy="8.75" fill={secondaryfill} r=".75" />
        <circle cx="6.75" cy="9.25" fill={secondaryfill} r=".75" />
        <circle cx="8.75" cy="11.25" fill={secondaryfill} r=".75" />
        <circle cx="9" cy="9" fill={secondaryfill} r=".75" />
      </g>
    </svg>
  );
}

export default patches;
