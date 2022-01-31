import React from 'react';

type JSONDisplayParams = {
	json: object
}

export function JSONDisplay({ json }: JSONDisplayParams){
	return <pre>{ JSON.stringify(json, null, '\t') }</pre>
}
