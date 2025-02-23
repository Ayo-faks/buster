import React from 'react';

import { iconProps } from './iconProps';

function faceSmileUpsideDown(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'face smile upside down';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,1C4.589,1,1,4.589,1,9s3.589,8,8,8,8-3.589,8-8S13.411,1,9,1Zm-3,9c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm3-4.25c-.658,0-1.262,.334-1.616,.893-.223,.349-.686,.453-1.035,.232-.35-.222-.454-.685-.232-1.035,.631-.996,1.709-1.59,2.884-1.59s2.253,.595,2.884,1.59c.222,.35,.117,.813-.232,1.035-.125,.079-.264,.116-.401,.116-.248,0-.491-.123-.634-.349-.354-.559-.958-.893-1.616-.893Zm3,4.25c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default faceSmileUpsideDown;
