import React from 'react';

import { iconProps } from './iconProps';

function road(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'road';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M16.547,13.717L13.187,3.216c-.233-.728-.903-1.216-1.667-1.216H6.48c-.764,0-1.434,.489-1.667,1.217L1.453,13.717c-.172,.538-.08,1.108,.253,1.565,.333,.457,.849,.718,1.414,.718H14.88c.565,0,1.081-.262,1.414-.718,.333-.457,.425-1.027,.253-1.565Zm-6.797-.467c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-1c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v1Zm0-3.75c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-1c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v1Zm0-3.75c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-1c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v1Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default road;
