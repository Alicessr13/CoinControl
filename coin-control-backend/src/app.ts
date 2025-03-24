import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found-handler';
import { routes } from './routes';

const app = fastify();
app.register(fastifyCors, { origin: '*' });
app.register(fastifyJwt, { secret: 'supersecret' });
app.addHook('onResponse', logger);
app.setErrorHandler(errorHandler);
app.setNotFoundHandler(notFoundHandler);
app.register(routes);

export { app };
