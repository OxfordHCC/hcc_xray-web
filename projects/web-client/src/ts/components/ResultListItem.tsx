import React from 'react';

type ResultListItem = {
	value: any
}
export function ResultListItem({ value }: ResultListItem ){
	return <div>
		{JSON.stringify(value)}
	</div>
}
