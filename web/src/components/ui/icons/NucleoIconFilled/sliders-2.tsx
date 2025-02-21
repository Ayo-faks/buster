import React from 'react';

import { iconProps } from './iconProps';

function sliders2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'sliders 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M16.25,8.25h-1c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M1.75,4.5h2.628c.321,1.011,1.257,1.75,2.372,1.75,1.379,0,2.5-1.122,2.5-2.5s-1.121-2.5-2.5-2.5c-1.116,0-2.052,.739-2.372,1.75H1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75Z"
          fill={fill}
        />
        <path
          d="M16.25,3h-5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={fill}
        />
        <path
          d="M16.25,13.5h-5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={fill}
        />
        <path
          d="M6.75,11.75c-1.116,0-2.052,.739-2.372,1.75H1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h2.628c.321,1.011,1.257,1.75,2.372,1.75,1.379,0,2.5-1.122,2.5-2.5s-1.121-2.5-2.5-2.5Z"
          fill={fill}
        />
        <path
          d="M11,6.5c-1.116,0-2.052,.739-2.372,1.75H1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h6.878c.321,1.011,1.257,1.75,2.372,1.75,1.379,0,2.5-1.122,2.5-2.5s-1.121-2.5-2.5-2.5Zm0,3.5c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Z"
          fill={secondaryfill}
        />
      </g>
    </svg>
  );
}

export default sliders2;
