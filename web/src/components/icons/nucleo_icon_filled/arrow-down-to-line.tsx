import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function arrowDownToLine(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "arrow down to line";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M8.47,12.78c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l4-4c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-2.72,2.72V2.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v7.689l-2.72-2.72c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l4,4Z" fill={fill}/>
		<path d="M15.25,14.5H2.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75H15.25c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default arrowDownToLine;