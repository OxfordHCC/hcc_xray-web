import { getByAPKName } from '../lib/android';
import { search } from '../lib/search';
import { WithClient } from '../lib/xray_db';
import { GET, HTTPError, getAPIMeta } from '../lib/http';

export function registerAPIEndpoints(
	withClient: WithClient,
	GET: GET
) {
	GET("/", () => {
		// send api metadata
		return getAPIMeta()
	});

	GET("/android", async (req) => {
		const apkName = req.searchParams.get("apk");
		const analysis = await withClient(getByAPKName(apkName));
		if(analysis === undefined){
			throw new HTTPError(404, "Apk not found.");
		}
		
		return analysis;
	});

	GET("/search", async (req) => {
		const query = req.searchParams.get("query");
		const results = await withClient(search(query));
		if(results.length === 0){
			throw new HTTPError(404, "No results found matching query");
		}
		return { results };
	});
}
