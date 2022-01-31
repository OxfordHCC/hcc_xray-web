import React from 'react';
import { useState } from 'react';
import { gotoRoute } from '../lib/router';


export function HomeScreen(){
	const [query, setQuery] = useState<string>("");

	const updateQuery: React.ChangeEventHandler<HTMLInputElement> = function(evt){
		const value = evt.target.value;
		setQuery(value);
	}

	const gotoQuery = function(e){
		e.preventDefault();
		gotoRoute("#query", { query });
	}
	
	return (
		<div>
			<div>
				<h1>x-ray</h1>
				<form action="#" onSubmit={gotoQuery}>
					<input type="text" onChange={updateQuery} />
					<input type="submit" value="Send"/>
				</form>
			</div>
		</div>
	);
}
