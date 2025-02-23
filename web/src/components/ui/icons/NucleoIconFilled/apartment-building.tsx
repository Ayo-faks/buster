import React from 'react';

import { iconProps } from './iconProps';

function apartmentBuilding(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || 'apartment building';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M16.25,15.5h-.75V4.88c0-.67-.391-1.29-.995-1.579L9.756,1.03c-.48-.23-1.032-.23-1.511,0L3.495,3.301c-.604,.289-.995,.909-.995,1.579V15.5h-.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h6.5v-2.75c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v2.75h6.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75ZM7,10.5c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Zm0-3.25c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Zm2.75,3.25c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Zm0-3.25c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Zm2.75,3.25c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Zm0-3.25c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default apartmentBuilding;
