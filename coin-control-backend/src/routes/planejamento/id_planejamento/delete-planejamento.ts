import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";
import { AppError } from "@/errors/app-error";

export async function deletePlanejamento(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;
    const { id_planejamento } = request.params as { id_planejamento: string }; // Corrigido para acessar corretamente o parâmetro
    const id_planejamento_numero = parseInt(id_planejamento, 10); // Converter para número

    let query: QueryConfig = {
        text: `
            SELECT * FROM planejamento
            WHERE id_planejamento = $1
            AND id_usuario = $2
        `,
        values: [
            id_planejamento_numero,
            id_usuario,
        ],
    };

    const planejamento = await sql(query);
    
    if (!planejamento.length) {
        throw new AppError('Planejamento não encontrado', 404);
    }

    query = {
        text: `
            DELETE FROM planejamento
            WHERE id_planejamento = $1
        `,
        values: [id_planejamento_numero],
    };

    await sql(query);
    return reply.status(204).send();
}