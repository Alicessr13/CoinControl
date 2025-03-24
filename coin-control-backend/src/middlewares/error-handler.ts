import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from '@/errors/app-error';

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
    if (error.statusCode) {
        return reply.status(error.statusCode).send({
            message: error.message,
        });
    }

    if (error.validation || error instanceof ZodError) {
        return reply.status(400).send({
            message: 'validation error',
        });
    }

    if (error instanceof AppError) {
        return reply.status(error.status).send({
            message: error.message,
        });
    }

    console.error(error);
    return reply.status(500).send({
        message: 'internal server error',
    });
}
