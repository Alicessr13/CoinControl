import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AppError } from '@/errors/app-error';
import { hashPassword } from '@/lib/bcryptjs';
import { QueryConfig } from 'pg';
import { sql } from '@/lib/pg';

export async function postRegister(request: FastifyRequest, reply: FastifyReply) {
    const register_body_schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = register_body_schema.parse(request.body);

    // Verificar se o email já está em uso
    const check_email_query: QueryConfig = {
        text: `
            SELECT EXISTS (
                SELECT 1 FROM usuarios WHERE email = $1
            ) AS email_exists
        `,
        values: [email],
    };

    const select_email_exists = await sql<{ email_exists: boolean }>(check_email_query);

    const { email_exists } = select_email_exists[0];

    if (email_exists) {
        throw new AppError('E-mail já cadastrado', 400);
    }

    // Hash da senha
    const hash_senha = await hashPassword(password);

    // Inserir novo usuário
    const insert_query: QueryConfig = {
        text: `
            INSERT INTO usuarios (email, hash_senha)
            VALUES ($1, $2)
            RETURNING id_usuario, email
        `,
        values: [email, hash_senha],
    };

    const new_user = await sql<{
        id_usuario: number;
        email: string;
    }>(insert_query);

    // Gerar token JWT para o novo usuário
    const token = await reply.jwtSign(
        {
            id_usuario: new_user[0].id_usuario,
            email: new_user[0].email,
        },
        {
            sign: { expiresIn: '7d' },
        },
    );

    return reply.status(201).send({
        user: {
            id: new_user[0].id_usuario,
            email: new_user[0].email,
        },
        token,
    });
}
