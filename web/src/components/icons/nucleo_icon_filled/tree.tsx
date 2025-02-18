import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_tree(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px tree";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M15.354,12.806l-2.799-3.806h1.194c.282,0,.541-.159,.669-.411,.128-.251,.104-.554-.063-.782L9.605,1.308c-.283-.387-.928-.387-1.211,0L3.645,7.808c-.167,.228-.191,.53-.063,.782,.128,.252,.387,.411,.669,.411h1.194l-2.799,3.806c-.167,.228-.192,.531-.064,.783,.127,.252,.386,.412,.669,.412h5v2.25c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-2.25h5c.283,0,.542-.159,.669-.412,.128-.252,.103-.555-.064-.783Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_tree;