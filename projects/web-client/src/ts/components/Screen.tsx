import React from 'react';

export function Screen({children}){
	return (
		<div style={{
			minHeight: "100vh",
			backgroundColor: "#f5f7fa"
		}}>
			{children}
		</div>
	);
}
