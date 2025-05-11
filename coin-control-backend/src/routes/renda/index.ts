import { FastifyInstance } from 'fastify';
import { getRendas } from './get-rendas';
import { postRenda } from './post-renda';
import { z } from 'zod';
import { routesIdRenda } from './id_renda';
import { validateToken } from '@/middlewares/validate-token';

// Definição do schema para validação do parâmetro id_renda
const id_renda_schema = z.object({ id_renda: z.string() }); // Alterado para string já que virá da URL

async function routes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', validateToken);
    fastify.get('/', getRendas);
    fastify.post('/', postRenda);
    
    // Registrando as sub-rotas com o parâmetro id_renda
    fastify.register(routesIdRenda, { prefix: '/:id_renda' });
}

export { routes as routesRenda, id_renda_schema };
