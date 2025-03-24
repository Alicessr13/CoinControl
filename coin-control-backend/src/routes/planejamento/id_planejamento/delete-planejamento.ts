import { FastifyReply, FastifyRequest } from "fastify";
import { id_planejamento_schema } from "..";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";
import { AppError } from "@/errors/app-error";

export async function deletePlanejamento(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;
    const { id_planejamento } = id_planejamento_schema.parse(request.params);

    let query: QueryConfig = {
        text: `
            SELECT * FROM planejamento
            WHERE id_planejamento = $1
            AND id_usuario = $2
        `,
        values: [
            id_planejamento,
            id_usuario,
        ],
    };

    const planejamento = await sql(query);
    
    if (!planejamento.length) {
        throw new AppError('Planejamento não encontrado', 404);
    }

    query = {
        text: `
            DELETE FROM planejamento
            WHERE id_planejamento = $1
        `,
        values: [id_planejamento],
    };

    await sql(query);
    return reply.status(204).send();
}
