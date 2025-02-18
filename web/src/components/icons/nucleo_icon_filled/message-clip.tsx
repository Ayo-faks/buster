import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_messageClip(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px message clip";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9.5,13.75v-2.5c0-1.93,1.57-3.5,3.5-3.5,1.334,0,2.495,.75,3.086,1.85,.21-.065,.433-.1,.664-.1,.086,0,.167,.016,.25,.025V4.25c0-1.517-1.233-2.75-2.75-2.75H3.75c-1.517,0-2.75,1.233-2.75,2.75v7c0,1.517,1.233,2.75,2.75,2.75h1.25v2.25c0,.288,.165,.551,.425,.676,.104,.05,.215,.074,.325,.074,.167,0,.333-.056,.469-.165l3.324-2.66c-.013-.143-.043-.28-.043-.426Z" fill={fill}/>
		<path d="M16.75,11c-.414,0-.75,.336-.75,.75v2c0,.965-.785,1.75-1.75,1.75s-1.75-.785-1.75-1.75v-2.5c0-.276,.225-.5,.5-.5s.5,.224,.5,.5v2c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-2c0-1.103-.897-2-2-2s-2,.897-2,2v2.5c0,1.792,1.458,3.25,3.25,3.25s3.25-1.458,3.25-3.25v-2c0-.414-.336-.75-.75-.75Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default 18px_messageClip;