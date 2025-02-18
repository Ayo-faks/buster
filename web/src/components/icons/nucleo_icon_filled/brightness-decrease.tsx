import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function brightnessDecrease(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "brightness decrease";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9,2.5c.414,0,.75-.336,.75-.75v-.25c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v.25c0,.414,.336,.75,.75,.75Z" fill={secondaryfill}/>
		<path d="M13.773,3.167l-.177,.177c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l.177-.177c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0Z" fill={secondaryfill}/>
		<path d="M16.5,8.25h-.25c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h.25c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
		<path d="M14.657,13.596c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l.177,.177c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-.177-.177Z" fill={secondaryfill}/>
		<path d="M9,15.5c-.414,0-.75,.336-.75,.75v.25c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-.25c0-.414-.336-.75-.75-.75Z" fill={secondaryfill}/>
		<path d="M3.343,13.596l-.177,.177c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l.177-.177c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0Z" fill={secondaryfill}/>
		<path d="M1.75,8.25h-.25c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h.25c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
		<path d="M3.343,4.404c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061l-.177-.177c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l.177,.177Z" fill={secondaryfill}/>
		<circle cx="9" cy="9" fill={fill} r="5"/>
	</g>
</svg>
	);
};

export default brightnessDecrease;