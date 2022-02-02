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
				<h1>PlatformControlDB</h1>
				<Form layout="horizontal">
					<Form.Item
						extra={<Button onClick={gotoQuery} color="primary">Go</Button>}>
						<Input placeholder="Search by app id" onEnterPress={gotoQuery} onChange={updateQuery} />
					</Form.Item>
				</Form>
				<div style={{
					marginLeft: "30px",
					marginRight: "30px"
				}}>This website queries the data collected by Konrad Kollnig as part of the "xray2020" database, featured in <a href="https://doi.org/10.14763/2021.4.1611">Kollnig 2021</a>.</div>
				<div>Development of this app can be followed on <a href="https://github.com/treebirg/hcc_xray-web">Github</a>.</div>
				<div>For more tools, see <a href="https://platformcontrol.org">platformcontrol.org</a>.</div>
			</Space>
		</Screen>
	);
}
