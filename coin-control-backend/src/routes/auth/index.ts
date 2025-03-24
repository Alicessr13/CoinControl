import { FastifyInstance } from 'fastify';
import { postAuth } from './post-auth';

async function routes(fastify: FastifyInstance) {
    fastify.post('/', postAuth);
}

export { routes as routesAuth };
