import React from 'react';

import { iconProps } from './iconProps';

function folder5Open(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'folder 5 open';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M4.18,16h-.43c-1.517,0-2.75-1.233-2.75-2.75V3.75c0-.965,.785-1.75,1.75-1.75h3.797c.505,0,.986,.218,1.318,.599l2.1,2.401h5.286c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75h-5.626c-.216,0-.422-.093-.564-.256l-2.325-2.658c-.048-.055-.116-.085-.188-.085H2.75c-.138,0-.25,.112-.25,.25V13.25c0,.689,.561,1.25,1.25,1.25h.43c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M17.548,8.15c-.334-.414-.83-.65-1.361-.65H5.309c-.82,0-1.54,.582-1.711,1.383l-1.071,5c-.111,.52,.017,1.054,.351,1.467,.333,.413,.83,.649,1.36,.649H15.115c.82,0,1.54-.582,1.711-1.383l1.071-5c.111-.52-.016-1.054-.35-1.467Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default folder5Open;
