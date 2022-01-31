import { PoolClient } from 'pg';
import { getByAPKName } from './android';

export function search(query: string){
	return async(client: PoolClient) => {
		const apkRes = await getByAPKName(query)(client);
		return [apkRes].filter(x => x !== null && x !== undefined);
	}
}
