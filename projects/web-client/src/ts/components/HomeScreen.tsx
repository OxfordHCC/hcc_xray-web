import React from 'react';
import { useState } from 'react';
import { gotoRoute } from '../lib/router';
import { Button, Input, Space, Form } from 'antd-mobile';
import { Screen } from './Screen';


export function HomeScreen(){
	const [query, setQuery] = useState<string>("");

	const updateQuery = function(val: string){
		setQuery(val);
	}

	const gotoQuery = function(e){
		e.preventDefault();
		gotoRoute("#query", { query });
	}
	
	return (
		<Screen>
			<Space style={{
				height: "100%"
			}} justify="center" align="center" direction="vertical" block>
				<h1>PlatformControl</h1>
				<Form layout="horizontal">
					<Form.Item
						extra={<Button onClick={gotoQuery} color="primary">Go</Button>}>
						<Input onEnterPress={gotoQuery} onChange={updateQuery} />
					</Form.Item>
				</Form>
			</Space>
		</Screen>
	);
}
