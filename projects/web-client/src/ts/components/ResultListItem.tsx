import React from 'react';
import { App } from '../lib/remote';
import {gotoRoute} from '../lib/router';

type ResultListItem = {
	value: App
}
export function ResultListItem({ value }: ResultListItem ){
	function gotoAppScreen(){
		gotoRoute("#app", { app: value.app });
	}
	
	return (
		<div onClick={gotoAppScreen}>
			<div>{value.exodus_analysis?.application.name || "Unknown"}</div>
			<div>{value.app}</div>
			<div>{value.store}</div>
		</div>
	)
}
