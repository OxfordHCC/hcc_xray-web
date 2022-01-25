import http from 'http';
import {
	readConfig,
	ConfigSpec
} from './config';

type HTTPConfig = {
	"httpPort": number,
	"httpHost": string
}

const configSpec: ConfigSpec<HTTPConfig> = {
	"httpPort": {
		parseFn: parseInt,
		env: "XRAY_HTTP_PORT",
		defaultValue: 3001,
	},
	"httpHost": {
		defaultValue: "localhost"
	}
};

const {	httpPort, httpHost } = readConfig<HTTPConfig>(configSpec);


const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('okay');
});

server.listen(httpPort, httpHost, () => {
	console.log("listening ", httpHost, httpPort);
});
