import React from 'react';

import { iconProps } from './iconProps';

function squareArrowDownRight2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'square arrow down right 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M16,13.25V4.75c0-1.519-1.231-2.75-2.75-2.75H6.682c-1.336,0-2.006,1.616-1.061,2.561l4.879,4.879v-2.689c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v4.5c0,.414-.336,.75-.75,.75H6.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h2.689L4.561,5.621c-.945-.945-2.561-.276-2.561,1.061v6.568c0,1.519,1.231,2.75,2.75,2.75H13.25c1.519,0,2.75-1.231,2.75-2.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default squareArrowDownRight2;
