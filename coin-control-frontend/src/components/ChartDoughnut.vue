<template>
    <div>
        <MyLineChart :data="chartData" :options="chartOptions" class="w-full h-64" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

interface Renda {
    valor: number;
}

interface Gasto {
    valor: number;
}

interface Planejamento {
    valor_calculado: number;
}

export default defineComponent({
    components: { MyLineChart: Line },
    props: {
        rendas: { type: Array as () => Renda[], required: true },
        gastos: { type: Array as () => Gasto[], required: true },
        planejamentos: { type: Array as () => Planejamento[], required: true }
    },
    setup(props) {
        const totalRendas = computed(() =>
            props.rendas.reduce((sum, r) => sum + r.valor, 0)
        );
        const totalGastos = computed(() =>
            props.gastos.reduce((sum, g) => sum + g.valor, 0)
        );
        const totalPlan = computed(() =>
            props.planejamentos.reduce((sum, p) => sum + p.valor_calculado, 0)
        );

        const chartData = ref<ChartData<'line'>>({
            labels: ['Rendas', 'Gastos', 'Planejamentos'],
            datasets: [
                {
                    label: 'Valores',
                    data: [totalRendas.value, totalGastos.value, totalPlan.value],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    tension: 0.1
                }
            ]
        });

        watch([totalRendas, totalGastos, totalPlan], () => {
            chartData.value = {
                labels: ['Rendas', 'Gastos', 'Planejamentos'],
                datasets: [
                    {
                        label: 'Valores',
                        data: [totalRendas.value, totalGastos.value, totalPlan.value],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                        tension: 0.1
                    }
                ]
            };
        });

        const chartOptions = computed<ChartOptions<'line'>>(() => ({
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribuição de Rendas, Gastos e Planejamentos'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }));

        return { chartData, chartOptions };
    }
});
</script>
