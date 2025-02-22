import React from 'react';

import { iconProps } from './iconProps';

function slider(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'slider';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m15.25,11.5h-5.8258c.0415.2451.0758.4932.0758.75s-.0343.5049-.0758.75h5.8258c.4141,0,.75-.3359.75-.75s-.3359-.75-.75-.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m5,15.25c-1.6541,0-3-1.3459-3-3s1.3459-3,3-3,3,1.3459,3,3-1.3459,3-3,3Z"
          fill={fill}
          strokeWidth="0"
        />
        <path
          d="m8.5,5.75c0-.2568.0343-.5049.0758-.75H2.75c-.4141,0-.75.3359-.75.75s.3359.75.75.75h5.8258c-.0415-.2451-.0758-.4932-.0758-.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m13,8.75c-1.6541,0-3-1.3459-3-3s1.3459-3,3-3,3,1.3459,3,3-1.3459,3-3,3Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default slider;
