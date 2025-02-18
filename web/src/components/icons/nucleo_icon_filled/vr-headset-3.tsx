import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_vrHeadset3(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px vr headset 3";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M15.979,7.495c-.25,0-.496-.126-.638-.354l-1.892-3.049c-.23-.37-.627-.591-1.062-.591H5.613c-.436,0-.833,.221-1.062,.591l-1.892,3.049c-.218,.352-.682,.46-1.033,.242-.352-.218-.46-.681-.242-1.033l1.892-3.049c.506-.814,1.379-1.3,2.337-1.3h6.774c.958,0,1.831,.486,2.337,1.299l1.892,3.05c.218,.352,.11,.814-.242,1.033-.123,.077-.26,.113-.395,.113Z" fill={secondaryfill}/>
		<path d="M14.25,5H3.75c-1.517,0-2.75,1.233-2.75,2.75v4.5c0,1.517,1.233,2.75,2.75,2.75h2c.861,0,1.683-.411,2.2-1.1l.45-.6c.286-.381,.914-.381,1.2,0l.45,.601c.517,.688,1.339,1.1,2.2,1.1h2c1.517,0,2.75-1.233,2.75-2.75V7.75c0-1.517-1.233-2.75-2.75-2.75ZM5.5,11.5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5,.673,1.5,1.5-.673,1.5-1.5,1.5Zm7,0c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5,.673,1.5,1.5-.673,1.5-1.5,1.5Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_vrHeadset3;