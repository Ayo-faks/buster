import React from 'react';

import { iconProps } from './iconProps';

function xmasDecoration(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'xmas decoration';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,4c-.414,0-.75-.336-.75-.75V.75c0-.414,.336-.75,.75-.75s.75,.336,.75,.75V3.25c0,.414-.336,.75-.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M9,5.75c.869,0,1.676,.231,2.398,.605,.059-.107,.102-.224,.102-.355v-1.75c0-.965-.785-1.75-1.75-1.75h-1.5c-.965,0-1.75,.785-1.75,1.75v1.75c0,.131,.043,.248,.102,.355,.722-.374,1.529-.605,2.398-.605Z"
          fill={secondaryfill}
        />
        <path
          d="M9,5c-3.309,0-6,2.691-6,6s2.691,6,6,6,6-2.691,6-6-2.691-6-6-6Zm0,1.5c1.76,0,3.271,1.025,4.01,2.5H4.99c.739-1.475,2.25-2.5,4.01-2.5Zm0,9c-1.76,0-3.271-1.025-4.01-2.5H13.01c-.739,1.475-2.25,2.5-4.01,2.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default xmasDecoration;
