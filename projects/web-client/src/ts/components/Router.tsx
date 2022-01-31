import React from "react";
import {useState, useEffect } from 'react';
import { HomeScreen } from './HomeScreen';
import { QueryResultScreen } from './QueryResultScreen';

function parseParamString(paramString?: string): any{
	if(paramString === undefined){
		return {}
	}

	const decoded = decodeURI(paramString);	
	return JSON.parse(decoded);
}

type Route = {
	name: string,
	params: any
}

export function Router(): JSX.Element {
	const [route, setRoute] = useState<Route>({name: "", params: {}});
	console.log("route is", route);

	useEffect(() => {
		const onHashChange = function() {
			const hash = window.location.hash;
			const [name, paramString] = hash.split("?");
			
			const params = parseParamString(paramString);

			// change route
			setRoute({
				name,
				params
			});

		};

		onHashChange();

		window.addEventListener('hashchange', onHashChange);

		return () => {
			window.removeEventListener('hashchange', onHashChange);
		}
	}, []);

	switch(route.name){
		default:
			return (<HomeScreen/>);
		case "#query":
			return <QueryResultScreen query={route.params['query']} />
	}
}
