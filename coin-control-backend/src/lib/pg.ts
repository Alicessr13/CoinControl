import { Client, QueryConfig } from 'pg';
import { env } from '@/env';

export async function sql<T>(query: QueryConfig): Promise<T[]> {
    const client = new Client({
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
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
