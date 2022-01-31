import React from 'react';
import { useEffect, useState } from 'react';
import { getById, App } from '../lib/remote';
import { AppContent } from './AppContent';
import { Loading } from './Loading';

type AppScreenParams = {
	appId: string
}

export function AppScreen({ appId }: AppScreenParams){
	const [ app, setApp] = useState<App | null>(null);
	const [ error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		const fetchApp = async function(){
			const { error, data } = await getById(appId);
			if(error){
				setError(error.message);
				return;
			}
			setApp(data);
		}
		
		fetchApp();
	}, [appId]);

	return (
		<div>
			{
				(error !== null)
				? <div>{error}</div>
				: (
					(app !== null)
					? <AppContent app={app}/>
					: <Loading/>
				)
				
			}
		</div>
	);
}

