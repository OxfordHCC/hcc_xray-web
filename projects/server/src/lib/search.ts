import { PoolClient } from 'pg';

const searchQuery = `
SELECT * 
FROM app_versions 
WHERE app LIKE $1
`;
export function search(query: string){
	return async(client: PoolClient) => {
		const { rows } = await client.query(searchQuery, [`%${query}%`]);
		return rows;
	}
}
