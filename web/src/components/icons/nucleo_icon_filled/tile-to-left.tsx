import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_tileToLeft(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px tile to left";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M1,5.25v7.5c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V5.25c0-1.517-1.233-2.75-2.75-2.75H3.75c-1.517,0-2.75,1.233-2.75,2.75Zm7.22,3.22l2-2c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-.72,.72h4.189c.414,0,.75,.336,.75,.75,0,.414-.336,.75-.75,.75h-4.189s.72,.72,.72,.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22s-.384-.073-.53-.22l-2-2c-.293-.293-.293-.768,0-1.061ZM2.5,5.25c0-.69,.56-1.25,1.25-1.25h2c.69,0,1.25,.56,1.25,1.25v7.5c0,.69-.56,1.25-1.25,1.25H3.75c-.69,0-1.25-.56-1.25-1.25V5.25Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_tileToLeft;