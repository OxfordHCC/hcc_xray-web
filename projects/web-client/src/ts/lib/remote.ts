
const API_HOST = "api";
const API_PORT = 3001;

const apiHostname = `http://${API_HOST}:${API_PORT}`;

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
	store: string,
	id: number,
	app: string,
	analyzed: boolean,
	analysis_version: number, // what is this?
	exodus_analysis: ExodusAnalysis,
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

export async function search(query: string): Promise<SearchResult>{
	console.log("called search", query)
	const reqUrl = new URL("/search", apiHostname);
	reqUrl.searchParams.append("query", query);
	const res = await fetch(reqUrl.toString());
	const jsonRes = await res.json();

	return jsonRes as SearchResult;
}

type GetByIdResult = APIResult<App>;
export async function getById(apk: string): Promise<GetByIdResult>{
	console.log("called getById", apk);
	const reqUrl = new URL("/android", apiHostname);
	reqUrl.searchParams.append("apk", apk);
	const res = await fetch(reqUrl.toString());
	const jsonRes = await res.json();

	return jsonRes as GetByIdResult;
}
