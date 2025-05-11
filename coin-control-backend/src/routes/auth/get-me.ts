import { FastifyRequest, FastifyReply } from 'fastify';
import { QueryConfig } from 'pg';
import { sql } from '@/lib/pg';
import { AppError } from '@/errors/app-error';

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const query: QueryConfig = {
        text: `
            SELECT id_usuario, email
            FROM usuarios
            WHERE id_usuario = $1
        `,
        values: [id_usuario],
    };

    const user = await sql<{
        id_usuario: number;
        email: string;
    }>(query);

    if (!user.length) {
        throw new AppError('Usuário não encontrado', 404);
    }

    return reply.status(200).send({
        user: {
            id: user[0].id_usuario,
            email: user[0].email,
        },
    });
}