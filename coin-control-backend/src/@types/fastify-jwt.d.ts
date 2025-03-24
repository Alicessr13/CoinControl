import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            id_usuario: string;
            email: string;
        };
    };
};
