import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_lips(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px lips";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M1.25,9c2.768,0,3.045-.607,4.429-.607s1.661,.607,3.321,.607,1.938-.607,3.321-.607,2.214,.607,4.429,.607" fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
		<path d="M9,5.683c1.289-1.272,3.254-1.24,4.507,.074l3.243,3.243c-1.55,1.7-3.875,4.25-7.75,4.25S2.8,10.7,1.25,9l3.243-3.243c1.253-1.314,3.218-1.346,4.507-.074Z" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
	</g>
</svg>
	);
};

export default 18px_lips;