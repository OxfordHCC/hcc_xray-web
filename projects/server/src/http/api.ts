import { getByAPKName } from '../lib/android';
import { WithClient } from '../lib/xray_db';
import { GET, HTTPError } from '../lib/http';

const API_VERSION = 1;


export function registerAPIEndpoints(
	withClient: WithClient,
	GET: GET
) {
	GET("/", () => {
		// send api metadata
		return {
			version: API_VERSION
		};
	});

	GET("/android", async (req) => {
		const apkName = req.searchParams.get("apk");
		const analysis = await withClient(getByAPKName(apkName));
		if(analysis === undefined){
			throw new HTTPError(404, "Apk not found.");
		}
		
		return analysis;
	});
}
