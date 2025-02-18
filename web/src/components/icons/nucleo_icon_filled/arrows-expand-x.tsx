import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function arrowsExpandX(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "arrows expand x";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M13.53,5.22c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.97,1.97h-3.689c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h3.689l-1.97,1.97c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.25-3.25c.293-.293,.293-.768,0-1.061l-3.25-3.25Z" fill={secondaryfill}/>
		<path d="M7.25,8.25H3.561l1.97-1.97c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-3.25,3.25c-.293,.293-.293,.768,0,1.061l3.25,3.25c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-1.97-1.97h3.689c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={fill}/>
	</g>
</svg>
	);
};

export default arrowsExpandX;