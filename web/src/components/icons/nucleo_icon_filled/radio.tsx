import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function radio(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "radio";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<circle cx="9" cy="9" fill={secondaryfill} r="2.5"/>
		<path d="M6.172,5.111c-.292-.292-.767-.294-1.061,0-1.039,1.039-1.611,2.42-1.611,3.889s.572,2.851,1.611,3.889c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061-.756-.755-1.172-1.76-1.172-2.829s.416-2.073,1.172-2.829c.293-.293,.293-.768,0-1.061Z" fill={fill}/>
		<path d="M4.05,4.05c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0C1.384,4.595,.5,6.729,.5,9s.884,4.405,2.489,6.01c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c.293-.293,.293-.768,0-1.061-2.729-2.729-2.729-7.17,0-9.899Z" fill={fill}/>
		<path d="M12.889,5.111c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061c.756,.755,1.172,1.76,1.172,2.829s-.416,2.073-1.172,2.829c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22,.191,0,.384-.073,.53-.22,1.039-1.039,1.611-2.42,1.611-3.889s-.572-2.851-1.611-3.889Z" fill={fill}/>
		<path d="M15.011,2.99c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061c2.729,2.729,2.729,7.17,0,9.899-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22c1.605-1.605,2.489-3.74,2.489-6.01s-.884-4.405-2.489-6.01Z" fill={fill}/>
	</g>
</svg>
	);
};

export default radio;