import React from 'react';

import { iconProps } from './iconProps';

function threeWayArrowSplit(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'three way arrow split';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M15.53,7.47c-.293-.293-.768-.293-1.061,0l-4.72,4.72V2c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75V12.189L3.53,7.47c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l5.414,5.414c.236,.236,.366,.55,.366,.884v1.421c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.421c0-.334,.13-.648,.366-.884l5.414-5.414c.293-.293,.293-.768,0-1.061Z"
          fill={secondaryfill}
        />
        <path
          d="M11.75,5.25c-.192,0-.384-.073-.53-.22l-2.22-2.22-2.22,2.22c-.293,.293-.768,.293-1.061,0s-.293-.768,0-1.061l2.75-2.75c.293-.293,.768-.293,1.061,0l2.75,2.75c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
          fill={fill}
        />
        <path
          d="M15.25,12c-.414,0-.75-.336-.75-.75v-2.75h-2.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h3.5c.414,0,.75,.336,.75,.75v3.5c0,.414-.336,.75-.75,.75Z"
          fill={fill}
        />
        <path
          d="M2.75,12c-.414,0-.75-.336-.75-.75v-3.5c0-.414,.336-.75,.75-.75h3.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75H3.5v2.75c0,.414-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default threeWayArrowSplit;
