import React from 'react';

type iconProps = {
	fill?: string,
	secondaryfill?: string,
	strokewidth?: number,
	width?: string,
	height?: string,
	title?: string
}

function 18px_listFavs(props: iconProps) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '1em';
	const height = props.height || '1em';
	const title = props.title || "18px list favs";

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M16.25,4.5h-7.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h7.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={fill}/>
		<path d="M16.25,12h-7.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h7.5c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" fill={fill}/>
		<path d="M6.572,3.694l-1.468-.213-.656-1.329c-.168-.342-.729-.342-.896,0l-.656,1.329-1.468,.213c-.188,.027-.345,.159-.403,.34-.059,.181-.01,.38,.127,.513l1.062,1.035-.251,1.461c-.032,.188,.045,.377,.199,.489,.154,.113,.358,.126,.526,.038l1.312-.689,1.312,.689c.073,.039,.152,.058,.232,.058,.104,0,.207-.032,.294-.096,.154-.112,.231-.301,.199-.489l-.251-1.461,1.062-1.035c.137-.133,.186-.332,.127-.513-.059-.181-.216-.312-.403-.34Z" fill={secondaryfill}/>
		<path d="M6.572,11.194l-1.468-.213-.656-1.329c-.168-.342-.729-.342-.896,0l-.656,1.329-1.468,.213c-.188,.027-.345,.159-.403,.34-.059,.181-.01,.38,.127,.513l1.062,1.035-.251,1.461c-.032,.188,.045,.377,.199,.489,.154,.112,.358,.127,.526,.038l1.312-.689,1.312,.689c.073,.039,.152,.058,.232,.058,.104,0,.207-.032,.294-.096,.154-.112,.231-.301,.199-.489l-.251-1.461,1.062-1.035c.137-.133,.186-.332,.127-.513-.059-.181-.216-.312-.403-.34Z" fill={secondaryfill}/>
	</g>
</svg>
	);
};

export default 18px_listFavs;