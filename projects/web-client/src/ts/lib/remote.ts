
// These are replaced by esbuild at build time
// @ts-ignore
const API_HOST = XRAY_API_HOST;
// @ts-ignore
const API_PORT = XRAY_API_PORT;
// @ts-ignore
const API_SUFFIX = XRAY_API_SUFFIX;

const apiHostname = `http://${API_HOST}:${API_PORT}`;

console.log("API_SUFFIX", API_SUFFIX);

export type Manifest = {
	manifest: {
		"-compileSdkVersion": string,
		"-compileSdkVersionCodename": string
	}
}

export type ExodusTracker = {
	name: string,
	id: number // what is this?
}

export type ExodusAnalysis = {
	apk: {
		checksum: string
	},
	application: {
		handle: string,
		name: string,
		permissions: string[],
		uaid: string,
		version_code: string,
		version_name: string
	},
	trackers: ExodusTracker[]
}

export type App = {
	version: string,
	store: string,
	id: number,
	app: string,
	analyzed: boolean,
	analysis_version: number, // what is this?
	exodus_analysis?: ExodusAnalysis,
	manifest: Manifest,
	files: string[],
	urls: string[],
	last_analyze_attempt: string
}

type APIResult<T> = {
	error?: {
		message: string,
		name: string,
		code: number
	}
	data?: T
}

type SearchResult = APIResult<{
	results: App[]
}>;

function createAPIUrl(path: string){
	return new URL(`${API_SUFFIX}${path}`, apiHostname);
}

export async function search(query: string): Promise<SearchResult> {
	const reqUrl = createAPIUrl("/search");
	reqUrl.searchParams.append("query", query);
	const res = await fetch(reqUrl.toString());
	const jsonRes = await res.json();

	return jsonRes as SearchResult;
}

type GetByIdResult = APIResult<App>;
export async function getById(apk: string, version: string): Promise<GetByIdResult>{
	const reqUrl = createAPIUrl("/android");
	reqUrl.searchParams.append("apk", apk);
	reqUrl.searchParams.append("version", version);
	const res = await fetch(reqUrl.toString());
	const jsonRes = await res.json();

	return jsonRes as GetByIdResult;
}
