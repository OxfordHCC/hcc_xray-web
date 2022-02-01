import React from 'react';
import { JsxElement } from 'typescript';

type CenterParams = {
	style?: React.CSSProperties,
	children: any
}
export function Center({ style, children }: CenterParams){
	return <div style={{
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		...style
	}}>{children}</div>
}
