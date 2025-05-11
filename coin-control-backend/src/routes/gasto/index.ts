import { FastifyInstance } from 'fastify';
import { getGastos } from './get-gastos';
import { postGasto } from './post-gasto';
import { z } from 'zod';
import { routesIdGasto } from './id_gasto';
import { validateToken } from '@/middlewares/validate-token';

// Alterado para string já que virá da URL
const id_gasto_schema = z.object({ id_gasto: z.string() });

async function routes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', validateToken);
    fastify.get('/', getGastos);
    fastify.post('/', postGasto);
    fastify.register(routesIdGasto, { prefix: '/:id_gasto' });
}

export { routes as routesGasto, id_gasto_schema };