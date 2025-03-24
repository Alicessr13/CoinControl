import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";

export async function getPlanejamentos(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const query: QueryConfig = {
        text: 'SELECT * FROM planejamento WHERE id_usuario = $1',
        values: [id_usuario],
    };

    const planejamentos = await sql(query);
    return reply.status(200).send({ planejamentos });
}
