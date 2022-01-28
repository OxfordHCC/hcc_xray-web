import {
	HTTPConfig,
	httpSpec,
	startServer
} from './http';
import {
	DBConfig,
	dbSpec,
	connectDatabase
} from './lib/xray_db';
import {
	readConfig,
	ConfigSpec
} from './config';


type ServerConfig = DBConfig & HTTPConfig;
const serverConfig: ConfigSpec<ServerConfig> = {
	...httpSpec,
	...dbSpec,
};

const {
	httpPort,
	httpHost,
	dbUser,
	dbPass,
	dbHost,
	dbPort,
	dbDatabase,
} = readConfig<ServerConfig>(serverConfig);

(async function(){
	const withClient = connectDatabase({
		dbUser,
		dbPass,
		dbHost,
		dbPort,
		dbDatabase
	});
	
	await startServer(withClient, httpHost, httpPort);
	console.log(`HTTP server at ${httpHost}:${httpPort}`);
})();


