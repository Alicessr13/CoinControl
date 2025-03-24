import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AppError } from '@/errors/app-error';
import { comparePassword } from '@/lib/bcryptjs';
import { QueryConfig } from 'pg';
import { sql } from '@/lib/pg';

export async function postAuth(request: FastifyRequest, reply: FastifyReply) {
    const auth_body_schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = auth_body_schema.parse(request.body);

    const query: QueryConfig = {
        text: `
            SELECT * FROM usuarios
            WHERE email = $1
        `,
        values: [email],
    };

    const select_user = await sql<{
        id_usuario: number;
        email: string;
        hash_senha: string;
    }>(query);

    if (!select_user.length) {
        throw new AppError('unauthorized', 401);
    }

    const user = select_user[0];

    const valid_password = await comparePassword(password, user.hash_senha);

    if (!valid_password) {
        throw new AppError('unauthorized', 401);
    }

    const token = await reply.jwtSign(
        {
            id_usuario: user.id_usuario,
            email: user.email,
        },
        {
            sign: { expiresIn: '7d' },
        },
    );

    return reply.status(200).send({ token });
}
