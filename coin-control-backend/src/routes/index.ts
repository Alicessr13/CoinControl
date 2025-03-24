import { FastifyInstance } from 'fastify';
import { routesAuth } from './auth';
import { routesRenda } from './renda';
import { routesGasto } from './gasto';
import { routesPlanejamento } from './planejamento';

export function routes(fastify: FastifyInstance) {
    fastify.get('/check', (_req, rep) => {
        return rep.status(200).send({
            message: 'Coin Control API online!',
        });
    });

    fastify.register(routesAuth, { prefix: '/auth' });
    fastify.register(routesRenda, { prefix: '/renda' });
    fastify.register(routesGasto, { prefix: '/gasto' });
    fastify.register(routesPlanejamento, { prefix: '/planejamento' });
}
