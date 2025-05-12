<template>
    <div>
        <MyLineChart :data="chartData" :options="chartOptions" class="w-full h-64" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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

export default defineComponent({
    components: { MyLineChart: Line },
    props: {
        rendas: { type: Array as () => { valor: number }[], required: true },
        gastos: { type: Array as () => { valor: number }[], required: true },
        planejamentos: { type: Array as () => { valor_calculado: number }[], required: true }
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

        const chartData = computed<ChartData<'line'>>(() => ({
            labels: ['Atual'],
            datasets: [
                {
                    label: 'Rendas',
                    data: [totalRendas.value],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1
                },
                {
                    label: 'Gastos',
                    data: [totalGastos.value],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1
                },
                {
                    label: 'Planejamentos',
                    data: [totalPlan.value],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }
            ]
        }));

        const chartOptions = computed<ChartOptions<'line'>>(() => ({
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: 'Rendas vs Gastos vs Planejamentos'
                }
            },
            scales: { y: { beginAtZero: true } }
        }));

        return { chartData, chartOptions };
    }
});
</script>
