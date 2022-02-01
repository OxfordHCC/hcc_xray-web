import React from 'react';
import { useEffect, useState } from 'react';
import { getById, search, App } from '../lib/remote';
import { AppContent } from './AppContent';
import { Loading } from './Loading';
import { Screen } from './Screen';
import { Center } from './Center';


type AppScreenParams = {
	appId: string,
	version: string
}

export function AppScreen({ appId, version }: AppScreenParams){
	const [ app, setApp] = useState<App | null>(null);
	const [ appVersions, setAppVersions] = useState<string[]>([]);
	const [ error, setError] = useState<string | null>(null);

	if(app !== null){
		Object.assign(window, { xray_app: app });
		
		console.info("App: ", app.app);
		console.info("🔍 Type 'console.log(xray_app)' to show raw app data.");
	}

	useEffect(() => {
		const fetchApp = async function(){
			const { error, data } = await getById(appId, version);
			if(error){
				setError(error.message);
				return;
			}
			setApp(data);
		}

		const fetchOtherVersions = async function(){
			const { error, data } = await search(appId);
			if(error){
				setError(error.message);
				return;
			}
			const versions = data.results.map(res => res.version);
			setAppVersions(versions);
		}
		
		fetchApp();
		fetchOtherVersions();
	}, [appId, version]);

	return (
		<Screen>
			{
				(error !== null)
				? <div>{error}</div>
				: (
					(app !== null)
					? <AppContent appVersions={appVersions} app={app}/>
					: <Center><Loading/></Center>
				)
				
			}
		</Screen>
	);
}

