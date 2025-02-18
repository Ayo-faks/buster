import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function heart2Lock(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "heart 2 lock";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M8,14.75c0-1.129,.597-2.149,1.507-2.732,.12-1.96,1.753-3.518,3.743-3.518,1.023,0,1.947,.416,2.624,1.083,.998-1.149,1.365-2.707,.967-4.218-.217-.827-.694-1.595-1.34-2.163-1.112-.975-2.559-1.372-3.971-1.084-1.002,.203-1.882,.718-2.533,1.463-.039-.044-.079-.088-.12-.132-1.734-1.825-4.63-1.9-6.456-.167-1.825,1.734-1.9,4.63-.163,6.459l5.48,5.694c.081,.084,.168,.157,.261,.222v-.909Z" fill={fill}/>
		<path d="M15.5,13.025v-.775c0-1.241-1.009-2.25-2.25-2.25s-2.25,1.009-2.25,2.25v.775c-.846,.123-1.5,.845-1.5,1.725v1.5c0,.965,.785,1.75,1.75,1.75h4c.965,0,1.75-.785,1.75-1.75v-1.5c0-.879-.654-1.602-1.5-1.725Zm-2.25-1.525c.414,0,.75,.336,.75,.75v.75h-1.5v-.75c0-.414,.336-.75,.75-.75Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default heart2Lock;