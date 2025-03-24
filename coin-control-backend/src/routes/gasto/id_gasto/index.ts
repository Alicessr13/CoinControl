import { FastifyInstance } from 'fastify';
import { deleteGasto } from './deleteGasto';
import { putGasto } from './putGasto';

async function routes(fastify: FastifyInstance) {
    fastify.delete('/', deleteGasto);
    fastify.put('/', putGasto);
}

export { routes as routesIdGasto };
