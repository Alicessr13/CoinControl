import { FastifyInstance } from 'fastify';
import { deleteRenda } from './delete-renda';

async function routes(fastify: FastifyInstance) {
    fastify.delete('/', deleteRenda);
}

export { routes as routesIdRenda };
