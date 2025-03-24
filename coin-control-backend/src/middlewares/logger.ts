import { FastifyReply, FastifyRequest } from 'fastify';
import { format } from 'date-fns';

function getStatusColor(status: number) {
    const color =
        status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
        : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
        : 0; // no color

    return `\x1b[${color}m${status}\x1b[0m`;
}

export function logger(request: FastifyRequest, reply: FastifyReply) {
    const { ip, method, url } = request;
    const { statusCode, elapsedTime } = reply;
    console.log(`[${ip}] ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')} - [${getStatusColor(statusCode)}] ${method} ${url} [${elapsedTime.toFixed(3)} ms]`);
}
