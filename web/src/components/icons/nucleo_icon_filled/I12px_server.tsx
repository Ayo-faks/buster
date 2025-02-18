import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function server(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "12px server";

	return (
		<svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="m9.75,0H2.25C1.01,0,0,1.009,0,2.25v1c0,1.241,1.01,2.25,2.25,2.25h7.5c1.24,0,2.25-1.009,2.25-2.25v-1c0-1.241-1.01-2.25-2.25-2.25ZM3,3.75c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm3,0c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Z" fill={fill} strokeWidth="0"/>
		<path d="m9.75,6.5H2.25c-1.24,0-2.25,1.009-2.25,2.25v1c0,1.241,1.01,2.25,2.25,2.25h7.5c1.24,0,2.25-1.009,2.25-2.25v-1c0-1.241-1.01-2.25-2.25-2.25Zm-6.75,3.75c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm3,0c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Z" fill={secondaryfill} strokeWidth="0"/>
	</g>
</svg>
	);
};

export default server;