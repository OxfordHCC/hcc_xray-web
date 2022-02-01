import React from 'react';
import { Loading } from './Loading';
import { ResultListItem } from './ResultListItem';
import { App } from '../lib/remote';
import { Center } from './Center';

type ResultListParams = {
	loading: boolean,
	results: Array<App>
}
export function ResultList({ loading, results }: ResultListParams){
	if(loading){
		return <Center><Loading/></Center>;
	}
	
	return (
		<>
			{
				results.map(res =>
				<ResultListItem value={res} key={res.id}/>)
			}
		</>
	);
}
