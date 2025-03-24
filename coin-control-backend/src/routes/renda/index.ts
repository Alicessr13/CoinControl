import { FastifyInstance } from 'fastify';
import { getRendas } from './get-rendas';
import { postRenda } from './post-renda';
import { z } from 'zod';
import { routesIdRenda } from './id_renda';
import { validateToken } from '@/middlewares/validate-token';

const id_renda_schema = z.object({ id_renda: z.number().int().positive() });

async function routes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', validateToken);
    fastify.get('/', getRendas);
    fastify.post('/', postRenda);
    fastify.register(routesIdRenda, { prefix: '/:id_renda' });
}

export { routes as routesRenda, id_renda_schema };
