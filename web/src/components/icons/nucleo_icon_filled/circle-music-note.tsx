import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function circleMusicNote(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "circle music note";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9,1C4.589,1,1,4.589,1,9s3.589,8,8,8,8-3.589,8-8S13.411,1,9,1Zm3.433,6.06c-.171,.377-.616,.543-.992,.373-.477-.216-.936-.474-1.363-.767-.026-.018-.052-.035-.077-.053v4.137c0,1.241-1.01,2.25-2.25,2.25s-2.25-1.009-2.25-2.25,1.01-2.25,2.25-2.25c.264,0,.514,.054,.75,.138v-3.638c0-.305,.185-.579,.467-.694,.281-.115,.604-.049,.818,.169,.348,.354,.73,.674,1.138,.952,.357,.244,.739,.459,1.137,.64,.378,.171,.545,.616,.373,.993Z" fill={fill}/>
	</g>
</svg>
	);
};

export default circleMusicNote;