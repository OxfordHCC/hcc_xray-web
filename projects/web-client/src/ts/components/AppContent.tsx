import React from 'react';
import { JSONDisplay } from './JSONDisplay';
import { App } from '../lib/remote';
import { List, AutoCenter, ErrorBlock } from 'antd-mobile';
import { Center } from './Center';

type AppContentParams = {
	app: App
}

// Question: It seems like exodus analysis and the other analysis may be out of sync,
// should we just display one or the other?

export function AppContent({ app }: AppContentParams){
	// add raw app data to global variable to enable debugging / inspection
	Object.assign(window, { xray_app: app });

	console.info("App: ", app.app);
	console.info("🔍 Type 'console.log(xray_app)' to show raw app data.");

	if (app.analyzed === false) {
		return (
			<>
				<List mode="card">
					<List.Item title="App">{app.app}</List.Item>
					<List.Item title="Version">{app.version}</List.Item>
				</List>

				<Center>
					<ErrorBlock
						status="empty"
						title="App not analyzed yet."
						description={
							<span>Soon, we will allow users to schedule app analyses. Until then, consider running the <a href="https://github.com/kasnder/platformcontrol-android-ios-analysis">Platformcontrol analysis</a> locally.</span>
						}>
					</ErrorBlock>
				</Center>
			</>
		);
	}

	const version = app.version;
	const permissions = app.exodus_analysis?.application.permissions || [];
	const trackers = app.exodus_analysis?.trackers || [];
	
	return (
		<div>
			<AutoCenter>
				<h1>
					{app.exodus_analysis?.application.name || "Unknown"}
				</h1>
			</AutoCenter>

			<List mode="card">
				<List.Item title="App">{app.app}</List.Item>
				<List.Item title="Version Name">{version}</List.Item>
				<List.Item title="Version code">{app.exodus_analysis?.application.version_code}</List.Item>
				<List.Item title="Compile SDK Version">{app.manifest.manifest['-compileSdkVersion']}</List.Item>
				<List.Item title="Compile SDK Codename">{app.manifest.manifest['-compileSdkVersionCodename']}</List.Item>

			</List>

			<List mode="card" header="Analysis Metadata">
				<List.Item title="Analysis Version">{app.analysis_version}</List.Item>
				<List.Item title="Last Analyzed">{app.last_analyze_attempt}</List.Item>
				<List.Item title="APK Checksum">{app.exodus_analysis?.apk.checksum}</List.Item>
			</List>

			<List mode="card" header="Permissions">
				{
					permissions.map(p => <List.Item key={p}>{p}</List.Item>)
				}
			</List>

			<List mode="card" header="Trackers">
				{
					trackers.map(t => <List.Item key={t.id}>{t.name}</List.Item>)
				}
			</List>
			<hr />
		</div>
	);
}
