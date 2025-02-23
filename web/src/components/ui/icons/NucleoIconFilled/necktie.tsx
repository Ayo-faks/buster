import React from 'react';

import { iconProps } from './iconProps';

function necktie(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'necktie';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M6.743,5h4.514l1.13-1.978c.251-.44,.302-.967,.137-1.446-.16-.469-.513-.845-.967-1.031-1.639-.672-3.475-.672-5.113,0-.454,.187-.807,.562-.967,1.031-.165,.479-.114,1.007,.137,1.446l1.13,1.978Z"
          fill={secondaryfill}
        />
        <path
          d="M11.296,6.5H6.704l-1.567,7.051c-.13,.587,.045,1.191,.471,1.617l2.155,2.155c.33,.331,.77,.513,1.237,.513s.907-.182,1.237-.513l2.156-2.155c.425-.426,.6-1.03,.47-1.616l-1.567-7.052Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default necktie;
