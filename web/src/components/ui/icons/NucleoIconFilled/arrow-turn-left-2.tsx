import React from 'react';

import { iconProps } from './iconProps';

function arrowTurnLeft2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'arrow turn left 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M15.25,15c-.414,0-.75-.336-.75-.75v-4c0-.689-.561-1.25-1.25-1.25H3c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H13.25c1.517,0,2.75,1.233,2.75,2.75v4c0,.414-.336,.75-.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M7,13.25c-.192,0-.384-.073-.53-.22L2.22,8.78c-.293-.293-.293-.768,0-1.061L6.47,3.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-3.72,3.72,3.72,3.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default arrowTurnLeft2;
