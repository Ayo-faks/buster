import React from 'react';

import { iconProps } from './iconProps';

function caretUpFromLine(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'caret up from line';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.75,14.5H3.25c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75H14.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M4.318,13H13.682c.638,0,1.226-.347,1.533-.906s.287-1.242-.055-1.781L10.479,2.93c-.323-.509-.876-.812-1.479-.812s-1.155,.304-1.479,.812L2.84,10.313c-.342,.539-.362,1.222-.055,1.781s.896,.906,1.533,.906Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default caretUpFromLine;
