import React from 'react';
import { Loading } from './Loading';
import { ResultListItem } from './ResultListItem';
import { App } from '../lib/remote';

type ResultListParams = {
	loading: boolean,
	results: Array<App>
}
export function ResultList({ loading, results }: ResultListParams){
	if(loading){
		return <Loading />;
	}
	
	return results
		.map(res => <ResultListItem value={res} key={res.app}/>);
}
