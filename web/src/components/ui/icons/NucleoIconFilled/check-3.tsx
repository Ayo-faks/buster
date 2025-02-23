import React from 'react';

import { iconProps } from './iconProps';

function check3(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'check 3';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M6.5,15h-.003c-.279,0-.535-.157-.663-.405-1.054-2.033-2.236-3.689-3.614-5.064-.293-.292-.294-.767,0-1.061,.292-.294,.767-.294,1.061,0,1.203,1.2,2.264,2.591,3.221,4.227,2.265-3.942,5.054-7.15,8.304-9.549,.333-.246,.803-.175,1.049,.158s.175,.803-.158,1.049c-3.392,2.504-6.263,5.951-8.532,10.247-.13,.246-.385,.399-.663,.399Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default check3;
