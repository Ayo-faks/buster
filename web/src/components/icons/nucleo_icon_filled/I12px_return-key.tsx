import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 12px_returnKey(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "12px return key";

	return (
		<svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="m9.75,7.5H1.25c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h8.5c.1377,0,.25-.1123.25-.25v-2.5c0-.1377-.1123-.25-.25-.25h-1.75c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h1.75c.9648,0,1.75.7852,1.75,1.75v2.5c0,.9648-.7852,1.75-1.75,1.75Z" fill={secondaryfill} strokeWidth="0"/>
		<path d="m3.75,10.25c-.1919,0-.3838-.0732-.5303-.2197L.4697,7.2803c-.293-.293-.293-.7676,0-1.0605l2.75-2.75c.293-.293.7676-.293,1.0605,0s.293.7676,0,1.0605l-2.2197,2.2197,2.2197,2.2197c.293.293.293.7676,0,1.0605-.1465.1465-.3384.2197-.5303.2197Z" fill={fill} strokeWidth="0"/>
	</g>
</svg>
	);
};

export default 12px_returnKey;