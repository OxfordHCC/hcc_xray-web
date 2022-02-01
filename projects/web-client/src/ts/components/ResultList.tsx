import React from 'react';
import { Loading } from './Loading';
import { ResultListItem } from './ResultListItem';
import { App } from '../lib/remote';
import { Center } from './Center';
import { Empty } from 'antd-mobile';

type ResultListParams = {
	loading: boolean,
	results: Array<App>
}
export function ResultList({ loading, results }: ResultListParams){
	if(loading){
		return <Center><Loading/></Center>;
	}

	if(results.length === 0){
		return <Center>
			<Empty description="No results."/>
		</Center>
	}
	
	return (
		<>
			{
				results.map(res =>
				<ResultListItem value={res} version={res.version} key={res.id}/>)
			}
		</>
	);
}
