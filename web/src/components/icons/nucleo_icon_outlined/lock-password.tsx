import React from 'react';
import { iconProps } from './iconProps';



function lockPassword(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px lock password";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M5.75,6.75V4c0-1.795,1.455-3.25,3.25-3.25h0c1.795,0,3.25,1.455,3.25,3.25v2.75" fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
		<path d="M9 9.5L9 10.5" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
		<rect height="6.5" width="10.5" fill="none" rx="1" ry="1" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth} x="3.75" y="6.75"/>
		<circle cx="2.25" cy="16.75" fill={secondaryfill} r="1.25"/>
		<circle cx="6.75" cy="16.75" fill={secondaryfill} r="1.25"/>
		<circle cx="11.25" cy="16.75" fill={secondaryfill} r="1.25"/>
		<circle cx="15.75" cy="16.75" fill={secondaryfill} r="1.25"/>
	</g>
</svg>
	);
};

export default lockPassword;