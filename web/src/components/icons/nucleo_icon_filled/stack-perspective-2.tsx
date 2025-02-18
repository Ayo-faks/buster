import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function stackPerspective2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "stack perspective 2";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M10.213,5.113L3.713,3.745c-.665-.14-1.352,.025-1.88,.455-.529,.429-.833,1.066-.833,1.747v7.434c0,1.058,.752,1.984,1.787,2.202l6.5,1.369c.155,.033,.312,.049,.467,.049,.51,0,1.008-.174,1.413-.503,.529-.429,.833-1.066,.833-1.747V7.315c0-1.058-.751-1.984-1.787-2.202Z" fill={fill}/>
		<path d="M15.213,2.417l-6.5-1.369c-1.029-.215-2.062,.302-2.505,1.263-.173,.376-.008,.822,.368,.995,.376,.172,.821,.009,.995-.368,.146-.321,.487-.495,.833-.422l6.5,1.369c.345,.073,.596,.381,.596,.734v7.434c0,.227-.102,.439-.277,.583-.177,.143-.404,.197-.627,.151l-.691-.146c-.4-.088-.803,.173-.889,.58-.085,.405,.175,.803,.58,.888l.691,.146c.155,.033,.312,.049,.467,.049,.51,0,1.008-.174,1.413-.503,.529-.429,.833-1.066,.833-1.747V4.619c0-1.058-.752-1.984-1.787-2.202Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default stackPerspective2;