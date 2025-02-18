import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function apple(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "apple";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M14.431,4.818c-1.383-1.099-2.877-.803-4.076-.566-.933,.185-1.653,.187-2.559-.011-1.156-.252-2.591-.565-4.1,.564-2.184,1.633-2.254,5.5-.159,8.802,1.794,2.83,3.756,2.465,4.928,2.249,.461-.086,.723-.085,1.183,0,.355,.066,.783,.146,1.256,.146,1.09,0,2.422-.421,3.673-2.395,2.156-3.404,1.654-7.363-.146-8.789Z" fill={fill}/>
		<path d="M11.5,.25h0c.276,0,.5,.224,.5,.5h0c0,1.38-1.12,2.5-2.5,2.5h0c-.276,0-.5-.224-.5-.5h0c0-1.38,1.12-2.5,2.5-2.5Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default apple;