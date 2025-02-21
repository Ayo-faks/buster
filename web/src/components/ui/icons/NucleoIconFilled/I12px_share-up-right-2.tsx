import React from 'react';

import { iconProps } from './iconProps';

function I12px_shareUpRight2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || '12px share up right 2';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m11.25,0h-3.75c-.414,0-.75.336-.75.75s.336.75.75.75h1.939l-4.702,4.702c-.293.293-.293.768,0,1.061.146.146.338.22.53.22s.384-.073.53-.22l4.702-4.702v1.939c0,.414.336.75.75.75s.75-.336.75-.75V.75c0-.414-.336-.75-.75-.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m7.25,11.5H3.25c-1.517,0-2.75-1.233-2.75-2.75v-4c0-1.517,1.233-2.75,2.75-2.75h2.465c.414,0,.75.336.75.75s-.336.75-.75.75h-2.465c-.689,0-1.25.561-1.25,1.25v4c0,.689.561,1.25,1.25,1.25h4c.689,0,1.25-.561,1.25-1.25v-2.465c0-.414.336-.75.75-.75s.75.336.75.75v2.465c0,1.517-1.233,2.75-2.75,2.75Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default I12px_shareUpRight2;
