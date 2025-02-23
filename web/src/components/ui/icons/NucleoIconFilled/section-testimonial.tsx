import React from 'react';

import { iconProps } from './iconProps';

function sectionTestimonial(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'section testimonial';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="m9,7.5c-1.6543,0-3-1.3457-3-3s1.3457-3,3-3,3,1.3457,3,3-1.3457,3-3,3Z"
          fill={fill}
          strokeWidth="0"
        />
        <path
          d="m16.25,10.5H1.75c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h14.5c.4141,0,.75.3359.75.75s-.3359.75-.75.75Z"
          fill={secondaryfill}
          strokeWidth="0"
        />
        <path
          d="m12.25,16.5h-6.5c-.9648,0-1.75-.7852-1.75-1.75v-1c0-.9648.7852-1.75,1.75-1.75h6.5c.9648,0,1.75.7852,1.75,1.75v1c0,.9648-.7852,1.75-1.75,1.75Z"
          fill={fill}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

export default sectionTestimonial;
