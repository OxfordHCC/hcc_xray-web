import React from 'react';
import { useState, useEffect } from 'react';
import { ResultList } from './ResultList';

type QueryResultScreen = {
	query: string
}
export function QueryResultScreen({ query }){
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults ] = useState<Array<any>>([]);
	
	useEffect(() => {
		setTimeout(() => {
			setResults(["some results", "here", "and there"]);
			setLoading(false);
		} , 2000);
	});
	
	return (
		<div>
			<h2>Query: {query}</h2>
			<hr/>
			<ResultList loading={loading} results={results}/>
		</div>
	);
}
