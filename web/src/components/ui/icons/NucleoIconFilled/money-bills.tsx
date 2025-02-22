import React from 'react';

import { iconProps } from './iconProps';

function moneyBills(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'money bills';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <circle cx="9" cy="10" fill={secondaryfill} r="2.5" />
        <path
          d="M14.75,2.5H3.25c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H14.75c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M14.25,4H3.75c-1.517,0-2.75,1.233-2.75,2.75v6.5c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V6.75c0-1.517-1.233-2.75-2.75-2.75Zm-1.608,10.5H5.358c-.364-1.399-1.459-2.494-2.858-2.858v-3.284c1.399-.364,2.494-1.459,2.858-2.858h7.284c.364,1.399,1.459,2.494,2.858,2.858v3.284c-1.399,.364-2.494,1.459-2.858,2.858Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default moneyBills;
