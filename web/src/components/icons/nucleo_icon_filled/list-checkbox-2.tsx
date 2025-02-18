import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_listCheckbox2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px list checkbox 2";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M6.412,9.876l-2.877,3.74-.755-.755c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.359,1.359c.142,.141,.332,.22,.53,.22,.017,0,.032,0,.049-.001,.215-.014,.414-.12,.546-.291l3.397-4.417c.252-.329,.19-.799-.138-1.052-.328-.254-.799-.19-1.052,.137Z" fill={fill}/>
		<path d="M6.412,2.376l-2.877,3.74-.755-.755c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l1.359,1.359c.142,.141,.332,.22,.53,.22,.017,0,.032,0,.049-.001,.215-.014,.414-.12,.546-.291L7.602,3.291c.252-.329,.19-.799-.138-1.052-.328-.254-.799-.19-1.052,.137Z" fill={fill}/>
		<path d="M16.25,4.5h-6.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h6.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
		<path d="M16.25,12h-6.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h6.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default 18px_listCheckbox2;