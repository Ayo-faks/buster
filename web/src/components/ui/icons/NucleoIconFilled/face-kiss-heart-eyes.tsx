import React from 'react';

import { iconProps } from './iconProps';

function faceKissHeartEyes(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'face kiss heart eyes';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,1C4.589,1,1,4.589,1,9s3.589,8,8,8,8-3.589,8-8S13.411,1,9,1Zm-2.907,9.445c-.117,.073-.267,.073-.384,0-.575-.358-2.24-1.532-2.24-3.134-.003-.715,.592-1.298,1.33-1.302,.444,.006,.856,.223,1.103,.581,.247-.358,.659-.575,1.103-.581,.738,.004,1.332,.587,1.33,1.302,0,1.601-1.666,2.776-2.24,3.134Zm3.657,4.18c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75c1.103,0,2,.897,2,2s-.897,2-2,2Zm2.541-4.18c-.117,.073-.267,.073-.384,0-.575-.358-2.24-1.532-2.24-3.134-.003-.715,.592-1.298,1.33-1.302,.444,.006,.856,.223,1.103,.581,.247-.358,.659-.575,1.103-.581,.738,.004,1.332,.587,1.33,1.302,0,1.601-1.666,2.776-2.24,3.134Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default faceKissHeartEyes;
