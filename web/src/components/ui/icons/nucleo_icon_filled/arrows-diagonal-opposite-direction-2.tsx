import React from 'react';

import { iconProps } from './iconProps';

function arrowsDiagonalOppositeDirection2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'arrows diagonal opposite direction 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M11.25,10.49c-.414,0-.75,.336-.75,.75v2.7L3.28,6.72c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l7.22,7.22h-2.7c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h4.511c.414,0,.75-.336,.75-.75v-4.51c0-.414-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M15.78,10.22L8.561,3h2.7c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75H6.75c-.414,0-.75,.336-.75,.75V6.76c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-2.7l7.22,7.22c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default arrowsDiagonalOppositeDirection2;
