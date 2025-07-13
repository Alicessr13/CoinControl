import 'dotenv/config';
import { z } from 'zod';

const env_schema = z.object({
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number().int().positive().default(5432),
    DATABASE: z.string(),
});

const env_parse = env_schema.safeParse(process.env);

if (!env_parse.success) {
    console.error('❌ Invalid environment variables: ', env_parse.error.format());
    throw new Error('Invalid environment variables');
}

export const env = env_parse.data;
