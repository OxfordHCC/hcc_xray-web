import React from 'react';

export function Center({ children }){
	return <div style={{
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}}>{children}</div>
}
