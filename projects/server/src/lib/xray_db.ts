import { Pool, PoolClient } from 'pg';
import { ConfigSpec } from '../config';

export type DBConfig = {
	"dbUser": string,
	"dbPass": string,
	"dbHost": string,
	"dbPort": number,
	"dbDatabase": string,
}
export const dbSpec: ConfigSpec<DBConfig> = {
	"dbUser": {
		env: "XRAY_PGUSER"
	},
	"dbPass": {
		env: "XRAY_PGPASSWORD"
	},
	"dbHost": {
		env: "XRAY_PGHOST",
		defaultValue: "localhost"
	},
	"dbPort": {
		env: "XRAY_PGPORT",
		parseFn: parseInt,
		defaultValue: 5432,
	},
	"dbDatabase": {
		env: "XRAY_PGDATABASE",
		defaultValue: "xray2020"
	}
}
export type WithClientQueryFunction = (client: PoolClient) => Promise<any>;
export type WithClient = (fn: WithClientQueryFunction) => Promise<any>
export function connectDatabase(config: DBConfig): WithClient {
	const pool = new Pool({
		host: config.dbHost,
		port: config.dbPort,
		database: config.dbDatabase,
		user: config.dbUser,
		password: config.dbPass,
	});

	pool.on("error", (err, _client) => {
		console.error("Postgres connection pool error", err);
	});

	// on connect just return a function we will use to
	// run queries with
	return async function(fn: WithClientQueryFunction) {
		const client = await pool.connect();
		const queryRes = await fn(client);
		client.release();
		
		return queryRes;
	};

}
