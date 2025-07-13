<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"

  />
</template>

<script lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    rendas: {
      type: Number,
      required: true
    },
    gastos: {
      type: Number,
      required: true
    },
    planejamentos: {
      type: Number,
      required: true
    },
    disponivel: {
      type: Number,
      required: true
    }
  },
  computed: {
  chartData() {
    return {
      labels: [ 'Rendas', 'Gastos', 'Planejamentos', 'Disponível' ],
      datasets: [
        {
          data: [this.rendas, this.gastos, this.planejamentos, this.disponivel],
          backgroundColor: [ '#9810fa', '#e7000b', '#155dfc', '#00a63e' ],
          borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
          borderWidth: 2,
        }
      ]
    }
  }
},
data() {
  return {
    chartOptions: { responsive: true }
  }
},
}
</script>
