import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_msgQuote(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px msg quote";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9,1C4.589,1,1,4.589,1,9c0,1.396,.371,2.776,1.062,3.971,.238,.446-.095,2.002-.842,2.749-.209,.209-.276,.522-.17,.798,.106,.276,.365,.465,.66,.481,.079,.004,.16,.006,.241,.006,1.145,0,2.535-.407,3.44-.871,.675,.343,1.39,.587,2.131,.728,.484,.092,.982,.138,1.478,.138,4.411,0,8-3.589,8-8S13.411,1,9,1Zm-.5,9.75c0,.414-.336,.75-.75,.75h-2c-.414,0-.75-.336-.75-.75v-1.5c0-1.953,.684-3.128,2.152-3.699,.386-.15,.82,.042,.971,.427,.15,.386-.042,.821-.427,.971-.503,.195-.996,.485-1.148,1.551h1.202c.414,0,.75,.336,.75,.75v1.5Zm4.5,0c0,.414-.336,.75-.75,.75h-2c-.414,0-.75-.336-.75-.75v-1.5c0-1.953,.684-3.128,2.152-3.699,.386-.15,.821,.042,.971,.427,.15,.386-.042,.821-.427,.971-.503,.195-.996,.485-1.148,1.551h1.202c.414,0,.75,.336,.75,.75v1.5Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_msgQuote;