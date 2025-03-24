import { FastifyInstance } from 'fastify';
import { deletePlanejamento } from './delete-planejamento';
import { putPlanejamento } from './put-planejamento';

async function routes(fastify: FastifyInstance) {
    fastify.delete('/', deletePlanejamento);
    fastify.put('/', putPlanejamento);
}

export { routes as routesIdPlanejamento };
