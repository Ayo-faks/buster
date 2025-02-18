import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function quickstart(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "quickstart";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M5.75,13.5H2.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h3c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" fill={secondaryfill}/>
		<path d="M9,3c-2.978,0-5.521,1.873-6.53,4.5h1.28c1.24,0,2.25,1.009,2.25,2.25,0,.268-.055,.522-.142,.761,1.189,.058,2.142,1.035,2.142,2.239,0,1.241-1.01,2.25-2.25,2.25h-1.639c1.263,1.235,2.988,2,4.889,2,3.859,0,7-3.14,7-7s-3.141-7-7-7Zm2.78,5.28l-2.25,2.25c-.146,.146-.338,.22-.53,.22s-.384-.073-.53-.22c-.293-.293-.293-.768,0-1.061l2.25-2.25c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061Z" fill={fill}/>
		<path d="M3.75,10.5H.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H3.75c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z" fill={secondaryfill}/>
		<path d="M11.25,.5H6.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.5v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={fill}/>
		<path d="M16.25,5.5c-.192,0-.384-.073-.53-.22l-2-2c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l2,2c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z" fill={fill}/>
	</g>
</svg>
	);
};

export default quickstart;