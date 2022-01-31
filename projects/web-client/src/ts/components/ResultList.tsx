import React from 'react';
import { Loading } from './Loading';
import { ResultListItem } from './ResultListItem';
import { App } from '../lib/remote';

type ResultList = {
	loading: boolean,
	results: Array<App>
}
export function ResultList({ loading, results }){
	if(loading){
		return <Loading />;
	}
	
	return results
		.map((res, i) => <ResultListItem value={res} key={i}/>);
}
