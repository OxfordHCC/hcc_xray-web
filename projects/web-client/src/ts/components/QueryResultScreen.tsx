import React from 'react';
import { useState, useEffect } from 'react';
import { ResultList } from './ResultList';
import { search } from '../lib/remote';
import { Screen } from './Screen';

type QueryResultScreen = {
	query: string
}
export function QueryResultScreen({ query }){
	const [loading, setLoading] = useState<boolean>(true);
	const [results, setResults ] = useState<Array<any>>([]);
	const [error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		const doQuery = async function(){
			const { error, data } = await search(`%${query}%`);
			if(error){
				setLoading(false);
				if(error.code === 404){
					setResults([]);
					return;
				}
				setError(error.message);
				console.error(error);
				return
			}
			setError(null);
			setResults(data['results']);
			setLoading(false);
		}

		doQuery();
	}, [query]);
	
	return (
		<Screen>
			<h1>Results for: {query}</h1>
			{
				(error !== null)? <span>{error}</span> : <></>
			}
			<ResultList loading={loading} results={results}/>
		</Screen>
	);
}
