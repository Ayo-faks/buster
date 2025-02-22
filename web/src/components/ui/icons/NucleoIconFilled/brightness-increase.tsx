import React from 'react';

import { iconProps } from './iconProps';

function brightnessIncrease(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'brightness increase';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,3c.414,0,.75-.336,.75-.75V.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.5c0,.414,.336,.75,.75,.75Z"
          fill={secondaryfill}
        />
        <path
          d="M13.773,4.977c.192,0,.384-.073,.53-.22l1.061-1.061c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-1.061,1.061c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22Z"
          fill={secondaryfill}
        />
        <path
          d="M17.25,8.25h-1.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M14.303,13.243c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.061,1.061c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-1.061-1.061Z"
          fill={secondaryfill}
        />
        <path
          d="M9,15c-.414,0-.75,.336-.75,.75v1.5c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.5c0-.414-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M3.697,13.243l-1.061,1.061c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l1.061-1.061c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0Z"
          fill={secondaryfill}
        />
        <path
          d="M3,9c0-.414-.336-.75-.75-.75H.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.5c.414,0,.75-.336,.75-.75Z"
          fill={secondaryfill}
        />
        <path
          d="M3.697,4.757c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-1.061-1.061c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.061,1.061Z"
          fill={secondaryfill}
        />
        <circle cx="9" cy="9" fill={fill} r="5" />
      </g>
    </svg>
  );
}

export default brightnessIncrease;
