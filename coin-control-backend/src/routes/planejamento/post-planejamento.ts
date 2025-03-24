import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";

export async function postPlanejamento(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const planejamento_body_schema = z.object({
        descricao: z.string(),
        valor: z.number(),
    });

    const { descricao, valor } = planejamento_body_schema.parse(request.body);

    const query: QueryConfig = {
        text: `
            INSERT INTO planejamento (
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
