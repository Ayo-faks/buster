import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function typography(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "typography";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M11.25,14.5h-1.5V2.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75V14.5h-1.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h4.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={secondaryfill}/>
		<path d="M14.751,5c-.275,0-.54-.152-.672-.415l-.543-1.085H4.464l-.543,1.085c-.185,.37-.635,.521-1.006,.335s-.521-.636-.336-1.006l.75-1.5c.127-.254,.387-.415,.671-.415H14c.284,0,.544,.161,.671,.415l.75,1.5c.186,.371,.035,.821-.336,1.006-.107,.054-.222,.079-.334,.079Z" fill={fill}/>
	</g>
</svg>
	);
};

export default typography;