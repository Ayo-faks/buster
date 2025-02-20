import React from 'react';
import { iconProps } from './iconProps';



function note2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px note 2";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M4.372,11.06c1.914-3.398,2.933-4.274,3.491-4.099,.895,.279,.635,3.275,1.583,3.45,.699,.129,1.318-1.41,2.07-1.218,.607,.155,.57,1.249,1.258,1.461,.276,.085,.574,0,.853-.156" fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
		<rect height="12.5" width="14.5" fill="none" rx="2" ry="2" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth} x="1.75" y="2.75"/>
	</g>
</svg>
	);
};

export default note2;