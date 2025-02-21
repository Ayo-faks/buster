import React from 'react';

import { iconProps } from './iconProps';

function flameSlash(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'flame slash';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M10.824,10.357c.495,.686,.938,1.527,.938,2.374,0,1.526-1.239,2.769-2.762,2.769-.903,0-1.698-.443-2.203-1.116l-1.435,1.435c1.026,.74,2.28,1.181,3.637,1.181,3.446,0,6.25-2.812,6.25-6.267,0-1.253-.439-2.533-1.066-3.735l-3.359,3.359Z"
          fill={fill}
        />
        <path
          d="M12.968,5.032c-1.55-2.154-3.343-3.733-3.475-3.848-.282-.246-.703-.246-.985,0-.235,.205-5.757,5.067-5.757,9.548,0,1.282,.387,2.474,1.049,3.468L12.968,5.032Z"
          fill={fill}
        />
        <path
          d="M2,16.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L15.47,1.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L2.53,16.53c-.146,.146-.338,.22-.53,.22Z"
          fill={secondaryfill}
        />
      </g>
    </svg>
  );
}

export default flameSlash;
