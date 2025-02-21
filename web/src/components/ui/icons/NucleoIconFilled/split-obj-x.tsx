import React from 'react';

import { iconProps } from './iconProps';

function splitObjX(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'split obj x';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M15.25,7.5c-.414,0-.75-.336-.75-.75v-2c0-.689-.561-1.25-1.25-1.25h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c1.517,0,2.75,1.233,2.75,2.75v2c0,.414-.336,.75-.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M13.25,16h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.689,0,1.25-.561,1.25-1.25v-2c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v2c0,1.517-1.233,2.75-2.75,2.75Z"
          fill={secondaryfill}
        />
        <path
          d="M8.75,.5c-.414,0-.75,.336-.75,.75v.75h-3.25c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75h3.25v.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V1.25c0-.414-.336-.75-.75-.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default splitObjX;
