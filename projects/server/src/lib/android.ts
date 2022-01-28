import { PoolClient } from 'pg';

const apkByNameQuery = (`
SELECT * 
FROM app_versions
WHERE app=$1
`)
export function getByAPKName(name: string){
	return async (client: PoolClient) => {
		const { rows } = await client.query(apkByNameQuery, [name]);
		return rows[0];
	}
}
