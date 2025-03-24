import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";

export async function postGasto(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const gasto_body_schema = z.object({
        descricao: z.string(),
        valor: z.number(),
    });

    const { descricao, valor } = gasto_body_schema.parse(request.body);

    const query: QueryConfig = {
        text: `
            INSERT INTO gasto (
                id_usuario,
                descricao,
                valor
            ) VALUES (
                $1, $2, $3
            )
        `,
        values: [
            id_usuario,
            descricao,
            valor,
        ],
    };

    await sql(query);
    return reply.status(201).send();
}
