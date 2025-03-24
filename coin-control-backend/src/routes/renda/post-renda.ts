import { sql } from "@/lib/pg";
import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";
import { z } from "zod";

export async function postRenda(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const renda_body_schema = z.object({
        descricao: z.string(),
        valor: z.number(),
    });

    const { descricao, valor } = renda_body_schema.parse(request.body);

    const query: QueryConfig = {
        text: `
            INSERT INTO renda (
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
