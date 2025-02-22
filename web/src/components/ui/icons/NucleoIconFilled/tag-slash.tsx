import React from 'react';

import { iconProps } from './iconProps';

function tagSlash(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'tag slash';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.78,6.907l-.009-.009-.246-.242-7.84,7.84,1.37,1.37c.536,.536,1.24,.804,1.944,.804s1.408-.268,1.944-.804l3.953-3.953c.52-.519,.806-1.209,.806-1.944s-.286-1.425-.806-1.944l-1.117-1.117Z"
          fill={fill}
        />
        <path
          d="M5.095,12.905l7.829-7.829-2.808-2.77c-.52-.52-1.21-.806-1.944-.806H3.25c-.965,0-1.75,.785-1.75,1.75v4.921c0,.735,.286,1.425,.806,1.945l2.789,2.789Zm1.155-7.905c.689,0,1.25,.561,1.25,1.25s-.561,1.25-1.25,1.25-1.25-.561-1.25-1.25,.561-1.25,1.25-1.25Z"
          fill={fill}
        />
        <path
          d="M2,16.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L15.47,1.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L2.53,16.53c-.146,.146-.338,.22-.53,.22Z"
          fill={secondaryfill}
        />
      </g>
    </svg>
  );
}

export default tagSlash;
