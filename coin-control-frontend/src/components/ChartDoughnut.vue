<template>
    <div>
        <Doughnut :data="chartData" :options="chartOptions" class="w-full h-64" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';

interface Renda {
    valor: number;
    // Add other properties of Renda if needed
}

interface Gasto {
    valor: number;
    // Add other properties of Gasto if needed
}

interface Planejamento {
    valor_calculado: number;
    // Add other properties of Planejamento if needed
}

export default defineComponent({
    components: { Doughnut },
    props: {
        rendas: { type: Array<Renda>, required: true },
        gastos: { type: Array<Gasto>, required: true },
        planejamentos: { type: Array<Planejamento>, required: true }
    },
    setup(props) {
        // Calcular totais
        const totalRendas = computed(() => props.rendas.reduce((sum, r) => sum + r.valor, 0));
        const totalGastos = computed(() => props.gastos.reduce((sum, g) => sum + g.valor, 0));
        const totalPlan = computed(() => props.planejamentos.reduce((sum, p) => sum + p.valor_calculado, 0));

        // Dados do gráfico
        const chartData = ref<ChartData<'doughnut'>>({
            labels: ['Rendas', 'Gastos', 'Planejamentos'],
            datasets: [{
                data: [totalRendas.value as number, totalGastos.value as number, totalPlan.value as number],
                // cores serão atribuídas automaticamente pelo Chart.js
            }]
        });

        // Update chartData whenever totalRendas, totalGastos, or totalPlan changes
        watch([totalRendas, totalGastos, totalPlan], () => {
            chartData.value = {
                labels: ['Rendas', 'Gastos', 'Planejamentos'],
                datasets: [{
                    data: [totalRendas.value as number, totalGastos.value as number, totalPlan.value as number],
                    // cores serão atribuídas automaticamente pelo Chart.js
                }]
            };
        });

        // Opções de exibição
        const chartOptions = computed<ChartOptions<'doughnut'>>(() => ({
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: 'Distribuição de Rendas, Gastos e Planejamentos'
                }
            }
        }));

        return { chartData, chartOptions };
    }
});
</script>