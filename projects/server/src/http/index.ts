import http from 'http';
import { ConfigSpec } from '../config';
import { createHTTPHandler } from '../lib/http';
import { WithClient } from '../lib/xray_db';
import { registerAPIEndpoints } from "./api";

export type HTTPConfig = {
	"httpPort": number,
	"httpHost": string
}
export const httpSpec: ConfigSpec<HTTPConfig> = {
	"httpPort": {
		parseFn: parseInt,
		env: "XRAY_HTTP_PORT",
		defaultValue: 3001,
	},
	"httpHost": {
		env: "XRAY_HTTP_HOST",
		defaultValue: "localhost"
	}
};

export function startServer(
	withClient: WithClient,
	httpHost: string,
	httpPort: number
) {
	return new Promise((resolve, reject) => {
		const { onRequest, GET } = createHTTPHandler();
		const server = http.createServer(onRequest);

		registerAPIEndpoints(withClient, GET);
		
		server.listen(httpPort, httpHost, () => {
			resolve(true);
		});
	})
}

