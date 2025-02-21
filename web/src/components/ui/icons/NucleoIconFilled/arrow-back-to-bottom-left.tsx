import React from 'react';

import { iconProps } from './iconProps';

function arrowBackToBottomLeft(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'arrow back to bottom left';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.75,14H4.008c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H13.75c.689,0,1.25-.561,1.25-1.25V5.75c0-.689-.561-1.25-1.25-1.25H4.25c-.689,0-1.25,.561-1.25,1.25v3c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-3c0-1.517,1.233-2.75,2.75-2.75H13.75c1.517,0,2.75,1.233,2.75,2.75v5.5c0,1.517-1.233,2.75-2.75,2.75Z"
          fill={secondaryfill}
        />
        <path
          d="M6.75,16.985c-.192,0-.384-.073-.53-.22l-2.992-2.993c-.293-.293-.293-.768,0-1.061l2.992-2.992c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-2.462,2.462,2.462,2.462c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default arrowBackToBottomLeft;
