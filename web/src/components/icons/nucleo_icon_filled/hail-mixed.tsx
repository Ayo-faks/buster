import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function hailMixed(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "hail mixed";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9.75,16c-.192,0-.384-.073-.53-.22l-.75-.75c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l.75,.75c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={fill}/>
		<path d="M7,13.25c-.192,0-.384-.073-.53-.22l-3.25-3.25c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l3.25,3.25c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={fill}/>
		<path d="M8.75,9.5c-.192,0-.384-.073-.53-.22l-.75-.75c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l.75,.75c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={secondaryfill}/>
		<path d="M6,6.75c-.192,0-.384-.073-.53-.22L2.22,3.28c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l3.25,3.25c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={secondaryfill}/>
		<path d="M15.25,10.5c-.192,0-.384-.073-.53-.22l-.75-.75c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l.75,.75c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={fill}/>
		<path d="M12.5,7.75c-.192,0-.384-.073-.53-.22l-3.25-3.25c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l3.25,3.25c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={fill}/>
	</g>
</svg>
	);
};

export default hailMixed;