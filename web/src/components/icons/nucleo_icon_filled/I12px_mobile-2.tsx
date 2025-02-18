import React from 'react';

import { iconProps } from './iconProps';

function mobile2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || '12px mobile 2';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m8.25,0H3.75C2.233,0,1,1.233,1,2.75v6.5c0,1.517,1.233,2.75,2.75,2.75h4.5c1.517,0,2.75-1.233,2.75-2.75V2.75c0-1.517-1.233-2.75-2.75-2.75Zm1.25,9.25c0,.689-.561,1.25-1.25,1.25H3.75c-.689,0-1.25-.561-1.25-1.25V2.75c0-.689.561-1.25,1.25-1.25h.25v.25c0,.414.336.75.75.75h2.5c.414,0,.75-.336.75-.75v-.25h.25c.689,0,1.25.561,1.25,1.25v6.5Z"
          fill={fill}
          strokeWidth="0"
        />
        <circle cx="6" cy="8.5" fill={secondaryfill} r="1" strokeWidth="0" />
      </g>
    </svg>
  );
}

export default mobile2;
