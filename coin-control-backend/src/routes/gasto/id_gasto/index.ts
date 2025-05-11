import { FastifyInstance } from 'fastify';
import { deleteGasto } from './delete-gasto';
import { putGasto } from './put-gasto';

async function routes(fastify: FastifyInstance) {
    fastify.delete('/', deleteGasto);
    fastify.put('/', putGasto);
}

export { routes as routesIdGasto };