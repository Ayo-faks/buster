import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_savedItems(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px saved items";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M13.25,2H4.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75Zm-1.25,8c0,.187-.104,.357-.269,.443-.073,.038-.152,.057-.231,.057-.101,0-.201-.03-.287-.09l-2.213-1.549-2.213,1.549c-.153,.107-.353,.12-.518,.034-.166-.086-.269-.257-.269-.443V4c0-.276,.224-.5,.5-.5h5c.276,0,.5,.224,.5,.5v6Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_savedItems;