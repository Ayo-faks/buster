import React from 'react';
import { iconProps } from './iconProps';

function suitClubs(props: iconProps) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '1em';
  const height = props.height || '1rem';
  const title = props.title || '18px suit clubs';

  return (
    <svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,10.75c0,3.178,2.584,5.042,4.75,5.5h-4.75s-4.75,0-4.75,0c2.166-.458,4.75-2.322,4.75-5.5Z"
          fill="none"
          stroke={secondaryfill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M9,9c0,1.795,1.455,3.25,3.25,3.25s3.25-1.455,3.25-3.25-1.455-3.25-3.25-3.25c-.034,0-.065,.009-.099,.01,.059-.245,.099-.497,.099-.76,0-1.795-1.455-3.25-3.25-3.25s-3.25,1.455-3.25,3.25c0,.263,.04,.515,.099,.76-.034-.001-.065-.01-.099-.01-1.795,0-3.25,1.455-3.25,3.25s1.455,3.25,3.25,3.25,3.25-1.455,3.25-3.25"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default suitClubs;
