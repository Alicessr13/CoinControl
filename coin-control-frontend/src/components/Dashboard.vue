<template>
    <div class="dashboard-container">
        <div class="dashboard-card">
            <h1 class="dashboard-title">Painel Financeiro</h1>
            <!--             <p class="dashboard-email">Usuário: {{ userEmail }}</p> -->
            <div>
                <h2 class="renda-title">Rendas</h2>
                <div class="actions">
                    <input v-model="novaDescricao" placeholder="Descrição" />
                    <input v-model.number="novoValor" placeholder="Valor" type="number" />
                    <button @click="criarRenda">Adicionar Renda</button>
                </div>

                <div v-if="rendas.length === 0" class="no-data">Nenhuma renda cadastrada.</div>
                <ul class="renda-list" v-else>
                    <li v-for="renda in rendas" :key="renda.id_renda">
                        <span>{{ renda.descricao }} - R$ {{ renda.valor }}</span>
                        <button @click="excluirRenda(renda.id_renda)">Excluir</button>
                    </li>
                </ul>
            </div>

            <div>
                <h2 class="renda-title">Gastos</h2>
                <div class="actions">
                    <input v-model="novaDescricaoGasto" placeholder="Descrição" />
                    <input v-model.number="novoValorGasto" placeholder="Valor" type="number" />
                    <button @click="criarGasto">Adicionar Gasto</button>
                </div>

                <div v-if="gastos.length === 0" class="no-data">Nenhum gasto cadastrado.</div>
                <ul class="renda-list" v-else>
                    <li v-for="gasto in gastos" :key="gasto.id_gasto">
                        <span>{{ gasto.descricao }} - R$ {{ gasto.valor }}</span>
                        <button @click="excluirGasto(gasto.id_gasto)">Excluir</button>
                    </li>
                </ul>
            </div>

            <div>
                <h2 class="renda-title">Planejamentos</h2>
                <div class="actions">
                    <input v-model="novaDescricaoPlanejamento" placeholder="Descrição" />
                    <input v-model.number="novoPercentualPlanejamento" placeholder="% do restante" type="number" />
                    <button @click="criarPlanejamento">Adicionar Planejamento</button>
                </div>

                <div v-if="planejamentos.length === 0" class="no-data">Nenhum planejamento cadastrado.</div>
                <ul class="renda-list" v-else>
                    <li v-for="p in planejamentos" :key="p.id_planejamento">
                        <span>{{ p.descricao }} - {{ p.valor }}% - Valor calculado: R$ {{ p.valor_calculado }}</span>
                    </li>
                </ul>
            </div>

            <button class="logout-button" @click="logout">Sair</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
/* import jwt_decode from 'jwt-decode'

interface JwtPayload {
    id_usuario: number
    email: string
} */

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Dashboard',
    setup() {
        const userEmail = ref('')
        const rendas = ref<{ id_renda: number; descricao: string; valor: number }[]>([])
        const novaDescricao = ref('')
        const novoValor = ref<number | null>(null)

        const carregarRendas = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                const res = await fetch('http://localhost:3333/renda', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await res.json()
                rendas.value = data.rendas
            } catch (err) {
                console.error('Erro ao buscar rendas', err)
            }
        }

        const criarRenda = async () => {
            const token = localStorage.getItem('token')
            if (!token || !novaDescricao.value || !novoValor.value) return

            try {
                await fetch('http://localhost:3333/renda', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: novaDescricao.value,
                        valor: novoValor.value,
                    }),
                })

                novaDescricao.value = ''
                novoValor.value = null
                await carregarRendas()
            } catch (err) {
                console.error('Erro ao criar renda', err)
            }
        }

        const excluirRenda = async (id: number) => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                await fetch(`http://localhost:3333/renda/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                await carregarRendas()
            } catch (err) {
                console.error('Erro ao excluir renda', err)
            }
        }

        const gastos = ref<{ id_gasto: number; descricao: string; valor: number }[]>([])
        const novaDescricaoGasto = ref('')
        const novoValorGasto = ref<number | null>(null)

        const carregarGastos = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                const res = await fetch('http://localhost:3333/gasto', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await res.json()
                gastos.value = data.gastos
            } catch (err) {
                console.error('Erro ao buscar gastos', err)
            }
        }

        const criarGasto = async () => {
            const token = localStorage.getItem('token')
            if (!token || !novaDescricaoGasto.value || !novoValorGasto.value) return

            try {
                await fetch('http://localhost:3333/gasto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: novaDescricaoGasto.value,
                        valor: novoValorGasto.value,
                    }),
                })

                novaDescricaoGasto.value = ''
                novoValorGasto.value = null
                await carregarGastos()
            } catch (err) {
                console.error('Erro ao criar gasto', err)
            }
        }

        const excluirGasto = async (id: number) => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                await fetch(`http://localhost:3333/gasto/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                await carregarGastos()
            } catch (err) {
                console.error('Erro ao excluir gasto', err)
            }
        }

        const planejamentos = ref<{ id_planejamento: number; descricao: string; valor: number; valor_calculado: number }[]>([])
        const novaDescricaoPlanejamento = ref('')
        const novoPercentualPlanejamento = ref<number | null>(null)

        const carregarPlanejamentos = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                const res = await fetch('http://localhost:3333/planejamento', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                planejamentos.value = data.planejamentos
            } catch (err) {
                console.error('Erro ao buscar planejamentos', err)
            }
        }

        const criarPlanejamento = async () => {
            const token = localStorage.getItem('token')
            if (!token || !novaDescricaoPlanejamento.value || !novoPercentualPlanejamento.value) return

            try {
                await fetch('http://localhost:3333/planejamento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: novaDescricaoPlanejamento.value,
                        valor: novoPercentualPlanejamento.value,
                    }),
                })

                novaDescricaoPlanejamento.value = ''
                novoPercentualPlanejamento.value = null
                await carregarPlanejamentos()
            } catch (err) {
                console.error('Erro ao criar planejamento', err)
            }
        }

        const logout = () => {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }

        onMounted(() => {
            /*             const token = localStorage.getItem('token')
                        if (token) {
                            const decoded = jwt_decode<JwtPayload>(token)
                            userEmail.value = decoded.email
                        } */

            carregarRendas()
            carregarGastos()
            carregarPlanejamentos()
        })

        return {
            userEmail,
            rendas,
            novaDescricao,
            novoValor,
            criarRenda,
            excluirRenda,
            gastos,
            novaDescricaoGasto,
            novoValorGasto,
            criarGasto,
            excluirGasto,
            logout,
            planejamentos,
            novaDescricaoPlanejamento,
            novoPercentualPlanejamento,
            criarPlanejamento,
        }
    },
})
</script>

<style scoped>
.dashboard-container {
    display: flex;
    justify-content: center;
    align-items: start;
    height: 100vh;
    padding-top: 4rem;
    background-color: #f5f5f5;
}

.dashboard-card {
    width: 100%;
    max-width: 600px;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.dashboard-email {
    font-size: 1rem;
    color: #34495e;
    margin-bottom: 1.5rem;
}

.actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

input {
    padding: 0.5rem;
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 0.5rem 1rem;
    background-color: #2ecc71;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #27ae60;
}

.renda-list {
    list-style: none;
    padding: 0;
}

.renda-list li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    background-color: #ecf0f1;
    padding: 0.5rem;
    border-radius: 4px;
}

.logout-button {
    margin-top: 2rem;
    background-color: #e74c3c;
}

.logout-button:hover {
    background-color: #c0392b;
}

.no-data {
    text-align: center;
    color: #7f8c8d;
}
</style>