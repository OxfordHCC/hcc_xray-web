
const API_HOST = "localhost";
const API_PORT = 3001;

const apiHostname = `http://${API_HOST}:${API_PORT}`;

export type App = any;

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
