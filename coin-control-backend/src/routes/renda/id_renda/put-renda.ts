import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";
import { AppError } from "@/errors/app-error";

export async function putRenda(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;
    const { id_renda } = request.params as { id_renda: string }; // Corrigido para acessar corretamente o parâmetro
    const id_renda_numero = parseInt(id_renda, 10); // Converter para número

    let query: QueryConfig = {
        text: `
            SELECT * FROM renda
            WHERE id_renda = $1
            AND id_usuario = $2
        `,
        values: [
            id_renda_numero,
            id_usuario,
        ],
    };

    const renda = await sql(query);

    if (!renda.length) {
        throw new AppError('Renda não encontrada', 404);
    }
    
    const renda_body_schema = z.object({
        descricao: z.string(),
        valor: z.number(),
    });

    const { descricao, valor } = renda_body_schema.parse(request.body);
    
    query = {
        text: `
            UPDATE renda SET
                descricao = $1,
                valor = $2
            WHERE id_renda = $3
        `,
        values: [
            descricao,
            valor,
            id_renda_numero,
        ],
    };

    await sql(query);
    return reply.status(204).send();
}