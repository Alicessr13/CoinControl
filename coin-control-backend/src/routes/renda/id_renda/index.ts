import { FastifyInstance } from 'fastify';
import { deleteRenda } from './delete-renda';
import { putRenda } from './put-renda'; // Adicionar importação do putRenda

async function routes(fastify: FastifyInstance) {
    fastify.delete('/', deleteRenda);
    fastify.put('/', putRenda); // Registrar a rota PUT para edição
}

export { routes as routesIdRenda };