import React from 'react';
import { Card } from 'antd-mobile';
import { App } from '../lib/remote';
import { gotoRoute } from '../lib/router';

type ResultListItem = {
	value: App,
	version: string
}
export function ResultListItem({ value, version }: ResultListItem ){
	function gotoAppScreen(){
		gotoRoute("#app", { app: value.app, version });
	}

	
	return (
		<Card style={{
			margin: "20px" }
		} onClick={gotoAppScreen}>
			<div style={{
				fontSize: "1.3em",
				fontWeight: "bold",
				marginBottom: "5px"
			}}>
				{value.exodus_analysis?.application.name || "Unknown"}
				<span style={{ marginLeft: "10px", color: "#bababa" }}>
					{value.version}
				</span>
			</div>
			<div>{value.app}</div>
		</Card>
	)
}
