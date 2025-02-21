import React from 'react';
import { iconProps } from './iconProps';

function video2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '18px video 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M11.75,8.75l3.797-1.688c.331-.147,.703,.095,.703,.457v4.961c0,.362-.372,.604-.703,.457l-3.797-1.688"
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <rect
          height="8.5"
          width="10"
          fill="none"
          rx="2"
          ry="2"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
          x="1.75"
          y="5.75"
        />
        <circle
          cx="4.25"
          cy="2"
          fill={secondaryfill}
          r="1.25"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <circle cx="9.25" cy="2.5" fill={secondaryfill} r="1.5" />
      </g>
    </svg>
  );
}

export default video2;
