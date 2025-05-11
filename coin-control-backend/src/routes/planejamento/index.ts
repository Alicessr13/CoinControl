import { FastifyInstance } from 'fastify';
import { getPlanejamentos } from './get-planejamentos';
import { postPlanejamento } from './post-planejamento';
import { z } from 'zod';
import { routesIdPlanejamento } from './id_planejamento';
import { validateToken } from '@/middlewares/validate-token';

// Alterado para string já que virá da URL
const id_planejamento_schema = z.object({ id_planejamento: z.string() });

async function routes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', validateToken);
    fastify.get('/', getPlanejamentos);
    fastify.post('/', postPlanejamento);
    fastify.register(routesIdPlanejamento, { prefix: '/:id_planejamento' });
}

export { routes as routesPlanejamento, id_planejamento_schema };
