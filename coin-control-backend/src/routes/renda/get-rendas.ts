import { sql } from "@/lib/pg";
import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";

export async function getRendas(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const query: QueryConfig = {
        text: 'SELECT * FROM renda WHERE id_usuario = $1',
        values: [id_usuario],
    };

    const rendas = await sql(query);
    return reply.status(200).send({ rendas });
}
