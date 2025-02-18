import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_equalLessThan(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px equal less than";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="m14.25,16.5H3.75c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h10.5c.4141,0,.75.3359.75.75s-.3359.75-.75.75Z" fill={secondaryfill} strokeWidth="0"/>
		<path d="m13.999,13.5c-.1172,0-.2363-.0273-.3477-.0859L3.6514,8.1641c-.2471-.1294-.4014-.3853-.4014-.6641s.1543-.5347.4014-.6641L13.6514,1.5859c.3691-.1924.8223-.0508,1.0127.3154.1924.3667.0518.8203-.3154,1.0127L5.6133,7.5l8.7354,4.5859c.3672.1924.5078.646.3154,1.0127-.1338.2554-.3945.4014-.665.4014Z" fill={fill} strokeWidth="0"/>
	</g>
</svg>
	);
};

export default 18px_equalLessThan;