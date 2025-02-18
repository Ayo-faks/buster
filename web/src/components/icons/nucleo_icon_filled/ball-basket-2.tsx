import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_ballBasket2(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px ball basket 2";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M9.573,1.573c0,1.885-.649,3.669-1.839,5.101l1.266,1.266L14.101,2.839c-1.292-1.074-2.873-1.699-4.554-1.812,.012,.182,.027,.363,.027,.547Z" fill={fill}/>
		<path d="M6.667,5.606c.909-1.144,1.407-2.549,1.407-4.033,0-.172-.012-.342-.025-.511-1.53,.18-2.961,.79-4.149,1.777l2.767,2.767Z" fill={secondaryfill}/>
		<path d="M12.394,11.333l2.767,2.767c.987-1.188,1.596-2.619,1.777-4.149-.17-.013-.339-.025-.511-.025-1.483,0-2.889,.497-4.033,1.407Z" fill={secondaryfill}/>
		<path d="M11.326,10.266c1.432-1.19,3.216-1.839,5.101-1.839,.184,0,.365,.014,.547,.027-.113-1.681-.738-3.262-1.812-4.554l-5.101,5.101,1.266,1.266Z" fill={fill}/>
		<path d="M5.606,6.667L2.839,3.899c-.987,1.188-1.596,2.619-1.777,4.149,.17,.013,.339,.025,.511,.025,1.483,0,2.889-.497,4.033-1.407Z" fill={secondaryfill}/>
		<path d="M8.427,16.427c0-1.885,.649-3.669,1.839-5.101l-1.266-1.266L3.899,15.161c1.292,1.074,2.873,1.699,4.554,1.812-.012-.182-.027-.363-.027-.547Z" fill={fill}/>
		<path d="M11.333,12.394c-.909,1.144-1.407,2.549-1.407,4.033,0,.172,.012,.342,.025,.511,1.53-.18,2.961-.79,4.149-1.777l-2.767-2.767Z" fill={secondaryfill}/>
		<path d="M6.674,7.734c-1.432,1.19-3.216,1.839-5.101,1.839-.184,0-.365-.014-.547-.027,.113,1.681,.738,3.262,1.812,4.554l5.101-5.101-1.266-1.266Z" fill={fill}/>
	</g>
</svg>
	);
};

export default 18px_ballBasket2;