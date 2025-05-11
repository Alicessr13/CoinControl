import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";
import { AppError } from "@/errors/app-error";

export async function putGasto(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;
    const { id_gasto } = request.params as { id_gasto: string }; // Corrigido para acessar corretamente o parâmetro
    const id_gasto_numero = parseInt(id_gasto, 10); // Converter para número

    let query: QueryConfig = {
        text: `
            SELECT * FROM gasto
            WHERE id_gasto = $1
            AND id_usuario = $2
        `,
        values: [
            id_gasto_numero,
            id_usuario,
        ],
    };

    const gasto = await sql(query);

    if (!gasto.length) {
        throw new AppError('Gasto não encontrado', 404);
    }
    
    const gasto_body_schema = z.object({
        descricao: z.string(),
        valor: z.number(),
    });

    const { descricao, valor } = gasto_body_schema.parse(request.body);
    
    query = {
        text: `
            UPDATE gasto SET
                descricao = $1,
                valor = $2
            WHERE id_gasto = $3
        `,
        values: [
            descricao,
            valor,
            id_gasto_numero,
        ],
    };

    await sql(query);
    return reply.status(204).send();
}