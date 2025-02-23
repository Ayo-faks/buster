import React from 'react';

import { iconProps } from './iconProps';

function chartPyramid(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'chart pyramid';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path d="M3.016 11L14.984 11 12.097 6 5.903 6 3.016 11z" fill={secondaryfill} />
        <path
          d="M14.425,15.5H3.575c-.84,0-1.592-.434-2.012-1.162-.42-.727-.42-1.595,0-2.322L6.988,2.62h0c.42-.727,1.172-1.161,2.012-1.161s1.592,.434,2.012,1.161l5.425,9.396c.42,.727,.42,1.595,0,2.322-.42,.728-1.172,1.162-2.012,1.162ZM8.287,3.37L2.862,12.766c-.214,.371-.071,.699,0,.822,.071,.124,.284,.412,.713,.412H14.425c.429,0,.642-.288,.713-.412,.071-.124,.214-.451,0-.822L9.713,3.37c-.215-.371-.57-.411-.713-.411s-.498,.04-.713,.411h0Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default chartPyramid;
