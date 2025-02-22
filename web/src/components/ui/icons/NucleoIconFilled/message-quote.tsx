import React from 'react';

import { iconProps } from './iconProps';

function messageQuote(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '15px';
  const title = props.title || 'message quote';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.25,1.5H3.75c-1.517,0-2.75,1.233-2.75,2.75v7c0,1.517,1.233,2.75,2.75,2.75h1.25v2.25c0,.288,.165,.551,.425,.676,.103,.05,.214,.074,.325,.074,.167,0,.333-.056,.469-.165l3.544-2.835h4.487c1.517,0,2.75-1.233,2.75-2.75V4.25c0-1.517-1.233-2.75-2.75-2.75Zm-5.75,8.25c0,.414-.336,.75-.75,.75h-2c-.414,0-.75-.336-.75-.75v-1.5c0-1.953,.684-3.128,2.152-3.699,.386-.15,.82,.042,.971,.427,.15,.386-.042,.821-.427,.971-.503,.195-.996,.485-1.148,1.551h1.202c.414,0,.75,.336,.75,.75v1.5Zm4.5,0c0,.414-.336,.75-.75,.75h-2c-.414,0-.75-.336-.75-.75v-1.5c0-1.953,.684-3.128,2.152-3.699,.386-.15,.821,.042,.971,.427,.15,.386-.042,.821-.427,.971-.503,.195-.996,.485-1.148,1.551h1.202c.414,0,.75,.336,.75,.75v1.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default messageQuote;
