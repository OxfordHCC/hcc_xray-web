import http from 'http';

// very smol http router

// types
interface ParsedIncomingMessage extends http.IncomingMessage {
	searchParams: URLSearchParams
}

type HTTPMethod = "GET" | "POST";

type RTreeNode = (
	{
		[index in HTTPMethod]?: http.RequestListener
	}
	& {
		nodes: { [index: string]: RTreeNode },
	}
);

type APIRequestHandler = (
	(req: ParsedIncomingMessage) => object | Promise<object>);

type ResolveNodeOptions = {
	trailblaze?: boolean,
}

type APIError = {
	message: string,
	name: string,
}

type APIMeta = {
	version: number
}

type APIResponse = APIMeta & {
	data?: {},
	error?: APIError,
}

export type GET = (path: string, fn: APIRequestHandler) => boolean;

function createRTreeNode(): RTreeNode {
	return {
		nodes: {}
	}
}

function traverse(tree: RTreeNode, pathArr: string[], options: ResolveNodeOptions = {}){
	if(pathArr.length === 0){
		return tree;
	}

	if(tree.nodes[pathArr[0]] === undefined){
		if(options.trailblaze === false){
			return undefined;
		}
		
		tree.nodes[pathArr[0]] = createRTreeNode();
	}

	return traverse(tree.nodes[pathArr[0]], pathArr.slice(1), options);
}

function getRequestHandler(
	tree: RTreeNode, method: string, pathArr: string[]
): APIRequestHandler{
	const node = traverse(tree, pathArr);
	if(node === undefined){
		return undefined;
	}

	return node[method];
}

function addRequestHandler(
	tree: RTreeNode, method: HTTPMethod, path: string, fn: http.RequestListener
) {
	const pathArr = path.split('/');
	const node = traverse(tree, pathArr, { trailblaze: true });
	node[method] = fn;

	return true;
}

export function getAPIMeta(): APIMeta{
	return {
		version: 1
	}
}

export class HTTPError extends Error{
	code = 500;
	
	constructor(code: number, message: string){
		super(message);

		Error.captureStackTrace(this, HTTPError)

		this.name = "HTTPError"
		this.code = code;
	}
}

export function createHTTPHandler() {
	const rootRTree = createRTreeNode();
	
	async function onRequest(
		req: http.IncomingMessage,
		res: http.ServerResponse
	) {
		const method = req.method;
		const parsedURL = new URL(
			req.url,
			`http://${req.headers.host}`
		);

		const { pathname, searchParams } = parsedURL;
		const pathArr = pathname.split('/');

		const requestHandler = getRequestHandler(
			rootRTree,
			method,
			pathArr
		);

		if (requestHandler === undefined) {
			res.writeHead(404);
			res.end();
			console.log(`${method} ${pathname} ${res.statusCode}`);
			return;
		}

		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");

		try {
			const parsedReq = Object.assign(
				{},
				req,
				{ searchParams }
			);
			
			const data = await requestHandler(parsedReq);
			const response = Object.assign(
				getAPIMeta(),
				{ data }
			);
			
			res.writeHead(200);
			res.end(JSON.stringify(response));
		} catch (err) {
			console.error(err);

			if(!(err instanceof HTTPError)){
				err = new HTTPError(500, "Something went bad");
			}

			const response = Object.assign(
				getAPIMeta(),
				{
					error: {
						message: err.message,
						code: err.code,
						name: err.name
					}
				}
			);

			res.writeHead(err.code);
			res.end(JSON.stringify(response));
		}
		console.log(`${method} ${pathname} ${res.statusCode}`);
	}

	function GET(path: string, fn: APIRequestHandler) {
		return addRequestHandler(rootRTree, "GET", path, fn);
	}

	function POST(path: string, fn: APIRequestHandler) {
		return addRequestHandler(rootRTree, "POST", path, fn);
	}

	return { onRequest, GET, POST };
}
