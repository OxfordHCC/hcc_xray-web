import tape from 'tape';
import path from 'path';
import { spawn, execSync, ChildProcess } from 'child_process';
import http from 'http';

let httpServerProcess: ChildProcess;

const serverRoot = path.join(__dirname, "..");

const XRAY_HTTP_HOST = "localhost";
const XRAY_HTTP_PORT = "3010";


type GETRes = [ http.IncomingMessage, string ];

function GET(pathName: string): Promise<GETRes> {
	return new Promise((resolve, reject) => {
		const req = http.get(`http://${XRAY_HTTP_HOST}:${XRAY_HTTP_PORT}${pathName}`, (res) => {
			res.setEncoding("utf8");

			let data = "";

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				resolve([res, data])
			});
		});

		req.on("error", (err) => {
			reject(err);
		});
	});
}

async function jsonGET(pathName: string): Promise<[ http.IncomingMessage, object] >{
	const [ req, rawData ] = await GET(pathName);
	return [ req, JSON.parse(rawData)];
}

function setup(){
	return new Promise((resolve, reject) => {
		execSync("npm run build server");
		httpServerProcess = spawn("node", ["--enable-source-maps", "index.js"],  {
			cwd: path.join(serverRoot, './build'),
			env: {
				PATH: process.env.PATH,
				XRAY_HTTP_PORT,
				XRAY_HTTP_HOST
			}
		});

		httpServerProcess.on("error", (err) => {
			reject(err);
		});

		let stderr = '';
		httpServerProcess.stderr?.setEncoding("utf8");

		httpServerProcess.stderr?.on("data", (errChunk) => {
			stderr += errChunk;
		});

		httpServerProcess.stderr?.on("end", () => {
			reject(stderr);
		});
		
		httpServerProcess.stdout?.on("data", () => {
			resolve(true);
		});
	});
		
}

function teardown(){
	if(httpServerProcess instanceof ChildProcess){
		httpServerProcess.kill("SIGTERM");
	}
}

tape("setup", async (t) => {
	t.plan(1);
	const res = await setup();
	t.ok(res);
});

tape("http server starts and / returns api metadata", async (t) => {
	t.plan(2);
	const [res, data] = await jsonGET('/');
	t.equals(res.statusCode, 200);
	t.assert(data.hasOwnProperty("version"));
});

tape.onFinish(() => {
	teardown();
});
