import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 12px_gear4(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "12px gear 4";

	return (
		<svg height={height} width={width} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="m11.538,4.933l-1.056-.44c-.07-.206-.15-.405-.246-.597l.435-1.057c.115-.28.051-.602-.163-.816l-.53-.53c-.215-.215-.537-.278-.815-.163l-1.057.435c-.193-.096-.391-.176-.598-.246l-.44-1.057c-.116-.279-.39-.461-.692-.461h-.75c-.303,0-.576.182-.692.461l-.44,1.057c-.206.07-.405.15-.598.246l-1.057-.435c-.277-.115-.601-.052-.815.163l-.53.53c-.214.214-.278.536-.163.816l.435,1.057c-.096.192-.176.391-.246.597l-1.056.44c-.28.117-.462.39-.462.692v.75c0,.303.182.576.462.692l1.056.44c.07.206.15.405.246.597l-.435,1.057c-.115.28-.051.602.163.816l.53.53c.144.144.335.22.53.22.097,0,.193-.019.285-.057l1.057-.435c.193.096.391.176.597.246l.44,1.057c.116.279.39.461.692.461h.75c.303,0,.576-.182.692-.461l.44-1.057c.206-.07.405-.15.598-.246l1.057.435c.092.038.188.057.285.057.195,0,.387-.076.53-.22l.53-.53c.214-.214.278-.536.163-.816l-.435-1.057c.096-.192.176-.391.246-.597l1.056-.44c.28-.117.462-.39.462-.692v-.75c0-.303-.182-.576-.462-.692Zm-5.538,4.317c-1.792,0-3.25-1.458-3.25-3.25s1.458-3.25,3.25-3.25,3.25,1.458,3.25,3.25-1.458,3.25-3.25,3.25Z" fill={fill} strokeWidth="0"/>
	</g>
</svg>
	);
};

export default 12px_gear4;