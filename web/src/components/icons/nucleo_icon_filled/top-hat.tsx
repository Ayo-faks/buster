import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function topHat(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "top hat";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M14.75,15.5H3.25c-1.517,0-2.75-1.233-2.75-2.75,0-.414,.336-.75,.75-.75s.75,.336,.75,.75c0,.689,.561,1.25,1.25,1.25H14.75c.689,0,1.25-.561,1.25-1.25,0-.414,.336-.75,.75-.75s.75,.336,.75,.75c0,1.517-1.233,2.75-2.75,2.75Z" fill={fill}/>
		<path d="M13.509,14.866l1.481-.232c-.308-1.963-.463-3.963-.459-5.945,.002-1.576,.105-3.167,.304-4.728,.063-.495-.09-.994-.42-1.368-.332-.377-.812-.593-1.315-.593H4.9c-.504,0-.983,.216-1.315,.593-.33,.374-.483,.873-.42,1.368,.199,1.562,.302,3.152,.304,4.728,.003,1.982-.151,3.982-.459,5.945l1.481,.232c.175-1.114,.298-2.239,.377-3.366H13.132c.079,1.127,.202,2.252,.377,3.366Z" fill={fill}/>
	</g>
</svg>
	);
};

export default topHat;