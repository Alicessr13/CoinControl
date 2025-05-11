import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AppError } from '@/errors/app-error';
import { hashPassword, comparePassword } from '@/lib/bcryptjs';
import { QueryConfig } from 'pg';
import { sql } from '@/lib/pg';

export async function putUpdateUser(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const updateBodySchema = z.object({
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        current_password: z.string().min(6).optional(),
    }).refine(data => {
        if (data.password && !data.current_password) {
            return false;
        }
        return true;
    }, {
        message: 'Para alterar a senha, forneça a senha atual',
    });

    const { email, password, current_password } = updateBodySchema.parse(request.body);

    if (!email && !password) {
        throw new AppError('Nenhum dado para atualizar', 400);
    }

    // Busca usuário atual
    const getUserQuery: QueryConfig = {
        text: `SELECT id_usuario, email, hash_senha FROM usuarios WHERE id_usuario = $1`,
        values: [id_usuario],
    };

    const users: { id_usuario: number; email: string; hash_senha: string }[] = await sql(getUserQuery);
    if (users.length === 0) {
        throw new AppError('Usuário não encontrado', 404);
    }
    const user = users[0];

    // Verifica senha atual se mudando senha
    if (password) {
        const valid = await comparePassword(current_password!, user.hash_senha);
        if (!valid) {
            throw new AppError('Senha atual incorreta', 400);
        }
    }

    // Monta query de atualização
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (email && email !== user.email) {
        // Verifica se email já existe
        const checkEmail: QueryConfig = {
            text: `SELECT 1 FROM usuarios WHERE email = $1 AND id_usuario != $2`,
            values: [email, id_usuario],
        };
        const existing = await sql(checkEmail);
        if (existing.length > 0) {
            throw new AppError('E-mail já está em uso', 400);
        }
        fields.push(`email = $${idx}`);
        values.push(email);
        idx++;
    }

    if (password) {
        const newHash = await hashPassword(password);
        fields.push(`hash_senha = $${idx}`);
        values.push(newHash);
        idx++;
    }

    if (fields.length === 0) {
        throw new AppError('Nenhum dado para atualizar', 400);
    }

    // Adiciona cláusula WHERE
    const text = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = $${idx} RETURNING id_usuario, email`;
    values.push(id_usuario);

    const updateQuery: QueryConfig = { text, values };
    const updated: { id_usuario: number; email: string }[] = await sql(updateQuery);

    return reply.status(200).send({
        user: {
            id: updated[0].id_usuario,
            email: updated[0].email,
        },
    });
}