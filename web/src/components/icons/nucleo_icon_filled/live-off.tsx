import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function liveOff(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "live off";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<circle cx="9" cy="1.75" fill={secondaryfill} r=".75"/>
		<circle cx="16.25" cy="9" fill={secondaryfill} r=".75"/>
		<circle cx="14.127" cy="14.127" fill={secondaryfill} r=".75"/>
		<circle cx="9" cy="16.25" fill={secondaryfill} r=".75"/>
		<circle cx="1.75" cy="9" fill={secondaryfill} r=".75"/>
		<circle cx="3.873" cy="3.873" fill={secondaryfill} r=".75"/>
		<circle cx="11.774" cy="2.302" fill={secondaryfill} r=".75"/>
		<circle cx="15.698" cy="6.226" fill={secondaryfill} r=".75"/>
		<circle cx="15.698" cy="11.774" fill={secondaryfill} r=".75"/>
		<circle cx="11.774" cy="15.698" fill={secondaryfill} r=".75"/>
		<circle cx="6.226" cy="15.698" fill={secondaryfill} r=".75"/>
		<circle cx="2.302" cy="11.774" fill={secondaryfill} r=".75"/>
		<circle cx="2.302" cy="6.226" fill={secondaryfill} r=".75"/>
		<circle cx="6.226" cy="2.302" fill={secondaryfill} r=".75"/>
		<path d="M12.534,5.466c-.905-.906-2.155-1.466-3.534-1.466-2.757,0-5,2.243-5,5,0,1.378,.561,2.628,1.466,3.534l7.068-7.067Z" fill={fill}/>
		<path d="M7.452,13.73c.49,.161,1.004,.27,1.548,.27,2.757,0,5-2.243,5-5,0-.544-.109-1.058-.27-1.548l-6.278,6.278Z" fill={fill}/>
		<path d="M2,16.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L15.47,1.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L2.53,16.53c-.146,.146-.338,.22-.53,.22Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default liveOff;