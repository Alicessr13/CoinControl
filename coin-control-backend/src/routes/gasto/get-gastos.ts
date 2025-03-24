import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";

export async function getGastos(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    const query: QueryConfig = {
        text: 'SELECT * FROM gasto WHERE id_usuario = $1',
        values: [id_usuario],
    };

    const gastos = await sql(query);
    return reply.status(200).send({ gastos });
}
