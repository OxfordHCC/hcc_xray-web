import React from 'react';

export function Screen({children}){
	return (
		<div style={{
			height: "100vh",
			backgroundColor: "#f5f7fa",
			overflow: "scroll",
			display: "flex",
			flexDirection: "column"
		}}>
			{children}
		</div>
	);
}
