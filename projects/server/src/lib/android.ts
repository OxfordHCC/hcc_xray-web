import { PoolClient } from 'pg';

const apkByNameVersionQuery = (`
SELECT * 
FROM app_versions
WHERE app=$1 AND version=$2
`)
export function getByAPKNameVersion(name: string, version: string){
	return async (client: PoolClient) => {
		const { rows } = await client.query(apkByNameVersionQuery, [name, version]);
		return rows[0];
	}
}
