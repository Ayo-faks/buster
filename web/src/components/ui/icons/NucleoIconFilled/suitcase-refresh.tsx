import React from 'react';

import { iconProps } from './iconProps';

function suitcaseRefresh(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '16px';
  const title = props.title || 'suitcase refresh';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M11.75,5.5c-.414,0-.75-.336-.75-.75V2.25c0-.138-.112-.25-.25-.25h-3.5c-.138,0-.25,.112-.25,.25v2.5c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75V2.25c0-.965,.785-1.75,1.75-1.75h3.5c.965,0,1.75,.785,1.75,1.75v2.5c0,.414-.336,.75-.75,.75Z"
          fill={fill}
        />
        <path
          d="M9.5,14c0-2.757,2.243-5,5-5,.402,0,.797,.047,1.18,.139,.349-.34,.811-.557,1.32-.614v-1.775c0-1.517-1.233-2.75-2.75-2.75H3.75c-1.517,0-2.75,1.233-2.75,2.75v6.5c0,1.517,1.233,2.75,2.75,2.75h6.174c-.269-.614-.424-1.288-.424-2Z"
          fill={fill}
        />
        <path
          d="M17.25,10c-.414,0-.75,.336-.75,.75v.374c-.572-.398-1.263-.624-2-.624-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5c.959,0,1.887-.4,2.546-1.098,.284-.301,.271-.776-.031-1.06-.3-.284-.776-.271-1.06,.031-.382,.405-.899,.627-1.455,.627-1.103,0-2-.897-2-2s.897-2,2-2c.495,0,.941,.193,1.295,.5h-1.045c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h2.5c.414,0,.75-.336,.75-.75v-2.5c0-.414-.336-.75-.75-.75Z"
          fill={secondaryfill}
        />
      </g>
    </svg>
  );
}

export default suitcaseRefresh;
