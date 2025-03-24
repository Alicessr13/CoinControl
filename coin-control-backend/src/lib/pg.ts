import { Pool, QueryConfig } from 'pg';
import { env } from '@/env';

const pool = new Pool({
    user: env.USER,
    host: env.HOST,
    database: env.DATABASE,
    password: env.PASSWORD,
    port: env.PORT,
});

export async function sql<T>(query: QueryConfig): Promise<T[]> {
    const client = await pool.connect();

    try {
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Erro ao executar a consulta SQL:', error);
        throw error;
    } finally {
        client.release();
    }
}

process.on('exit', () => pool.end());
