import React from 'react';

import { iconProps } from './iconProps';

function musicNote2(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'music note 2';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.609,5.342c-2.539-1.385-4.21-3.969-4.227-3.995-.18-.281-.521-.41-.843-.316-.319,.094-.54,.387-.54,.72V10.269c-.629-.476-1.403-.769-2.25-.769-2.068,0-3.75,1.682-3.75,3.75s1.682,3.75,3.75,3.75,3.75-1.682,3.75-3.75V3.915c.82,.903,1.977,1.972,3.391,2.743,.363,.198,.819,.065,1.018-.299,.199-.364,.064-.819-.299-1.018Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default musicNote2;
