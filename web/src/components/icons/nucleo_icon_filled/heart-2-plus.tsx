import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function heart2Plus(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "heart 2 plus";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9.5,11.75c0-1.241,1.01-2.25,2.25-2.25h.25v-.25c0-1.241,1.01-2.25,2.25-2.25,1.075,0,1.974,.759,2.196,1.77,.553-1.02,.703-2.228,.395-3.404-.217-.826-.693-1.595-1.342-2.164-1.11-.974-2.559-1.368-3.969-1.084-1.003,.203-1.883,.718-2.534,1.464-.039-.044-.079-.088-.12-.132-.84-.884-1.974-1.389-3.193-1.42-1.211-.026-2.378,.414-3.262,1.253-1.825,1.734-1.9,4.63-.163,6.459l5.479,5.694c.332,.346,.78,.537,1.26,.537h0c.48,0,.928-.19,1.261-.537l1.392-1.447c-1.193-.053-2.151-1.033-2.151-2.24Z" fill={fill}/>
		<path d="M16.75,11h-1.75v-1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.75h-1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.75v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default heart2Plus;