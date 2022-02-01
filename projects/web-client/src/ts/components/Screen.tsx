import React from 'react';

export function Screen({children}){
	return (
		<div style={{
			height: "100%"
		}}>
			{children}
		</div>
	);
}
