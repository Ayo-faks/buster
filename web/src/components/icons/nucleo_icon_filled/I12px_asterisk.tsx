import React from 'react';

import { iconProps } from './iconProps';

function asterisk(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || '12px asterisk';

  return (
    <svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m6,12c-.414,0-.75-.336-.75-.75V.75c0-.414.336-.75.75-.75s.75.336.75.75v10.5c0,.414-.336.75-.75.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m10.546,9.375c-.127,0-.256-.032-.375-.101L1.078,4.024c-.359-.207-.481-.666-.274-1.024.207-.359.667-.482,1.024-.274l9.094,5.25c.359.207.481.666.274,1.024-.139.241-.391.375-.65.375Z"
          fill={fill}
          strokeWidth="0"
        />
        <path
          d="m1.454,9.375c-.259,0-.511-.134-.65-.375-.207-.359-.084-.817.274-1.024L10.172,2.726c.358-.208.818-.084,1.024.274.207.359.084.817-.274,1.024L1.828,9.274c-.118.068-.247.101-.375.101Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default asterisk;
