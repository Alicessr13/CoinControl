import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

const app = createApp(App)

app.use(router)

app.mount('#app')
