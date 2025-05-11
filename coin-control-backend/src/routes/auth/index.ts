import { FastifyInstance } from 'fastify';
import { postAuth } from './post-auth';
import { postRegister } from './post-register';
import { getMe } from './get-me';
import { putUpdateUser } from './put-update-user';
import { validateToken } from '@/middlewares/validate-token';

async function routes(fastify: FastifyInstance) {
    // Rota de autenticação (login)
    fastify.post('/', postAuth);
    
    // Rota de cadastro de usuário
    fastify.post('/register', postRegister);
    
    // Rota para obter informações do usuário autenticado
    // Usando o middleware de autenticação
    fastify.get('/me', {
        onRequest: [(request, reply) => validateToken(request, reply)]
    }, getMe);
    
    // Rota para atualizar informações do usuário
    // Usando o middleware de autenticação
    fastify.put('/update', {
        onRequest: [(request, reply) => validateToken(request, reply)]
    }, putUpdateUser);
}

export { routes as routesAuth };
