import React from 'react';
import { iconProps } from './iconProps';



function sticker(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px sticker";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M16.237,9.267h0c-.681-.323-1.433-.517-2.237-.517-2.899,0-5.25,2.351-5.25,5.25,0,.803,.195,1.556,.517,2.237" fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
		<path d="M16.237,9.267s.013-.177,.013-.267c0-4.004-3.246-7.25-7.25-7.25S1.75,4.996,1.75,9s3.246,7.25,7.25,7.25c.09,0,.267-.013,.267-.013,.982-.392,2.626-1.192,4.201-2.768,1.575-1.575,2.376-3.219,2.768-4.201Z" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokewidth}/>
	</g>
</svg>
	);
};

export default sticker;