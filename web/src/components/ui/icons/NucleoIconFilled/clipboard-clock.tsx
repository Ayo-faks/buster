import React from 'react';

import { iconProps } from './iconProps';

function clipboardClock(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1em';
  const title = props.title || 'clipboard clock';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.75,10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm2.312,4.95c-.119,.29-.398,.465-.693,.465-.096,0-.191-.018-.285-.056l-1.619-.665c-.281-.116-.465-.39-.465-.694v-1.75c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v1.247l1.154,.474c.383,.157,.566,.596,.408,.979Z"
          fill={secondaryfill}
        />
        <path
          d="M8.25,14c0-.537,.081-1.055,.225-1.545-.072,.023-.145,.045-.225,.045h-2c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h2c.287,0,.528,.167,.654,.403,.929-1.727,2.752-2.903,4.846-2.903,.612,0,1.199,.105,1.75,.291V4.75c0-1.517-1.233-2.75-2.75-2.75h-.275c-.123-.846-.845-1.5-1.725-1.5h-3.5c-.879,0-1.602,.654-1.725,1.5h-.275c-1.517,0-2.75,1.233-2.75,2.75V14.25c0,1.517,1.233,2.75,2.75,2.75h3.896c-.565-.864-.896-1.893-.896-3ZM7,2.25c0-.138,.112-.25,.25-.25h3.5c.138,0,.25,.112,.25,.25v1c0,.138-.112,.25-.25,.25h-3.5c-.138,0-.25-.112-.25-.25v-1Zm-.75,5.75h3c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75h-3c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default clipboardClock;
