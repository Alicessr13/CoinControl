import { FastifyReply, FastifyRequest } from "fastify";
import { QueryConfig } from "pg";
import { sql } from "@/lib/pg";

interface RendaResult {
    total_renda: string;
}

interface GastoResult {
    total_gasto: string;
}

interface Planejamento {
    id_usuario : string;
    descricao: string;
    valor: number;
}

export async function getPlanejamentos(request: FastifyRequest, reply: FastifyReply) {
    const { id_usuario } = request.user;

    // Soma das rendas
    const rendaQuery: QueryConfig = {
        text: 'SELECT COALESCE(SUM(valor), 0) AS total_renda FROM renda WHERE id_usuario = $1',
        values: [id_usuario],
    };

    const rendaResult: RendaResult[] = await sql(rendaQuery);
    const totalRenda = parseFloat(rendaResult[0].total_renda || '0');

    // Soma dos gastos
    const gastoQuery: QueryConfig = {
        text: 'SELECT COALESCE(SUM(valor), 0) AS total_gasto FROM gasto WHERE id_usuario = $1',
        values: [id_usuario],
    };
    const gastoResult: GastoResult[] = await sql(gastoQuery);
    const totalGasto = parseFloat(gastoResult[0]?.total_gasto || '0');

    const restante = totalRenda - totalGasto;

    // Buscando planejamentos do usuário
    const planejamentosQuery: QueryConfig = {
        text: 'SELECT * FROM planejamento WHERE id_usuario = $1 ORDER BY id_planejamento ASC',
        values: [id_usuario],
    };
    const planejamentos: Planejamento[] = await sql(planejamentosQuery);

    // Calculando valor para cada planejamento com base no restante
    let restanteAtual = restante;
    const planejamentosComValor = planejamentos.map((p) => {
        const percentual = p.valor; // se o campo continuar como "valor"
        const valor = parseFloat((restanteAtual * (percentual / 100)).toFixed(2));
        restanteAtual -= valor;
    
        return {
            ...p,
            percentual,
            valor_calculado: valor,
        };
    });

    return reply.status(200).send({
        totalRenda,
        totalGasto,
        restante,
        planejamentos: planejamentosComValor,
    });
}



