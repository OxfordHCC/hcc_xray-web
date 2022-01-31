import React from 'react';
import { JSONDisplay } from './JSONDisplay';
import { App } from '../lib/remote';

type AppContentParams = {
	app: App
}

// Question: It seems like exodus analysis and the other analysis may be out of sync,
// should we just display one or the other?

export function AppContent({ app }: AppContentParams){
	if(app.analyzed === false){
		return <div>App not yet analyzed</div>;
	}
	
	return (
		<div>
			<h1>
				{app.exodus_analysis.application.name}
			</h1>

			<dl>
				<dt>APK handle</dt>
				<dd>{app.app}</dd>

				<dt>Version Name</dt>
				<dd>{app.exodus_analysis.application.version_name}</dd>

				<dt>Version code</dt>
				<dd>{app.exodus_analysis.application.version_code}</dd>

				<dt>Compile SDK Version</dt>
				<dd>{app.manifest.manifest['-compileSdkVersion']}</dd>

				<dt>Compile SDK Codename</dt>
				<dd>{app.manifest.manifest['-compileSdkVersionCodename']}</dd>

				<dt>App Checksum</dt>
				<dd>{app.exodus_analysis.apk.checksum}</dd>
			</dl>



			<div>
				<h2>Analysis Metadata</h2>
				<dl>
					<dt>Analysis Version</dt>
					<dd>{app.analysis_version}</dd>

					<dt>Last Analyzed</dt>
					<dd>{app.last_analyze_attempt}</dd>
				</dl>
			</div>

			<div>
				<h2>Permissions</h2>
				<JSONDisplay json={app.exodus_analysis.application.permissions} />
			</div>

			<div>
				<h2>Trackers</h2>
				<JSONDisplay json={app.exodus_analysis.trackers} />
			</div>

			<div>
				<h2>Files</h2>
				<JSONDisplay json={app.files} />
			</div>

		</div>
	);
}
