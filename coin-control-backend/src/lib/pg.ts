import { Client, QueryConfig } from 'pg';
import { env } from '@/env';

export async function sql<T>(query: QueryConfig): Promise<T[]> {
    const client = new Client({
        host: env.HOST,
        port: env.PORT,
        user: env.USER,
        password: env.PASSWORD,
        database: env.DATABASE,
    });

    try {
        await client.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Erro ao executar a consulta SQL:', error);
        throw error;
    } finally {
        await client.end();
    }
}
