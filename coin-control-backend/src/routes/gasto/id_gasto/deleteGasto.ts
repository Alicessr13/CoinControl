import { FastifyReply, FastifyRequest } from "fastify";
import { id_gasto_schema } from "..";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";
import { AppError } from "@/errors/app-error";

export async function deleteGasto(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;
    const { id_gasto } = id_gasto_schema.parse(request.params);

    let query: QueryConfig = {
        text: `
            SELECT * FROM gasto
            WHERE id_gasto = $1
            AND id_usuario = $2
        `,
        values: [id_gasto, id_usuario],
    };

    const gasto = await sql(query);

    if (!gasto.length) {
        throw new AppError('Gasto não encontrado', 404);
    }

    query = {
        text: `
            DELETE FROM gasto
            WHERE id_gasto = $1
        `,
        values: [id_gasto],
    };

    await sql(query);
    return reply.status(204).send();
}
