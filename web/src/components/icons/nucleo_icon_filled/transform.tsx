import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function transform(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "transform";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M13.873,4.357L5.373,1.119c-.536-.206-1.143-.133-1.616,.194-.474,.327-.757,.865-.757,1.44V15.25c0,.576,.283,1.114,.757,1.44,.296,.204,.644,.309,.993,.309,.21,0,.422-.038,.623-.115l8.501-3.238c.674-.257,1.126-.914,1.126-1.635V5.992c0-.721-.452-1.378-1.127-1.635Z" fill={fill}/>
	</g>
</svg>
	);
};

export default transform;