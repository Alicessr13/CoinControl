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
                        <template v-if="editandoRendaId === renda.id_renda">
                            <input v-model="descricaoEditada" />
                            <input v-model.number="valorEditado" type="number" />
                            <button @click="salvarEdicaoRenda">Salvar</button>
                            <button @click="cancelarEdicaoRenda">Cancelar</button>
                        </template>
                        <template v-else>
                            <span>{{ renda.descricao }} - R$ {{ renda.valor }}</span>
                            <div style="display: flex; gap: 0.5rem">
                                <button @click="iniciarEdicaoRenda(renda)">Editar</button>
                                <button @click="excluirRenda(renda.id_renda)">Excluir</button>
                            </div>
                        </template>
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
                        <template v-if="editandoGastoId === gasto.id_gasto">
                            <input v-model="descricaoEditadaGasto" />
                            <input v-model.number="valorEditadoGasto" type="number" />
                            <button @click="salvarEdicaoGasto">Salvar</button>
                            <button @click="cancelarEdicaoGasto">Cancelar</button>
                        </template>
                        <template v-else>
                            <span>{{ gasto.descricao }} - R$ {{ gasto.valor }}</span>
                            <div style="display: flex; gap: 0.5rem">
                                <button @click="iniciarEdicaoGasto(gasto)">Editar</button>
                                <button @click="excluirGasto(gasto.id_gasto)">Excluir</button>
                            </div>
                        </template>
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
                        <template v-if="editandoPlanejamentoId === p.id_planejamento">
                            <input v-model="descricaoEditadaPlanejamento" />
                            <input v-model.number="valorEditadoPlanejamento" type="number" />
                            <button @click="salvarEdicaoPlanejamento">Salvar</button>
                            <button @click="cancelarEdicaoPlanejamento">Cancelar</button>
                        </template>
                        <template v-else>
                            <span>{{ p.descricao }} - {{ p.valor }}% - Valor calculado: R$ {{ p.valor_calculado
                            }}</span>
                            <div style="display: flex; gap: 0.5rem">
                                <button @click="iniciarEdicaoPlanejamento(p)">Editar</button>
                                <button @click="excluirPlanejamento(p.id_planejamento)">Excluir</button>
                            </div>
                        </template>
                    </li>
                </ul>
            </div>

            <section class="mt-8">
                <ChartDoughnut :rendas="rendas" :gastos="gastos" :planejamentos="planejamentos" />
            </section>

            <button class="logout-button" @click="logout">Sair</button>
            <button>
                <a href="/change-password">Alterar Senha</a>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import ChartDoughnut from './ChartDoughnut.vue';

interface JwtPayload {
    id_usuario: number
    email: string
}

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Dashboard',
    components: { ChartDoughnut },
    setup() {
        const userEmail = ref('')
        const userId = ref<number | null>(null)
        const rendas = ref<{ id_renda: number; descricao: string; valor: number }[]>([])
        const novaDescricao = ref('')
        const novoValor = ref<number | null>(null)
        const editandoRendaId = ref<number | null>(null)
        const descricaoEditada = ref('')
        const valorEditado = ref<number | null>(null)


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

        const iniciarEdicaoRenda = (renda: { id_renda: number; descricao: string; valor: number }) => {
            editandoRendaId.value = renda.id_renda
            descricaoEditada.value = renda.descricao
            valorEditado.value = renda.valor
        }

        const salvarEdicaoRenda = async () => {
            const token = localStorage.getItem('token')
            if (!token || editandoRendaId.value === null || !descricaoEditada.value || !valorEditado.value) return

            try {
                await fetch(`http://localhost:3333/renda/${editandoRendaId.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: descricaoEditada.value,
                        valor: valorEditado.value,
                    }),
                })

                editandoRendaId.value = null
                descricaoEditada.value = ''
                valorEditado.value = null
                await carregarRendas()
            } catch (err) {
                console.error('Erro ao editar renda', err)
            }
        }

        const cancelarEdicaoRenda = () => {
            editandoRendaId.value = null
            descricaoEditada.value = ''
            valorEditado.value = null
        }


        const gastos = ref<{ id_gasto: number; descricao: string; valor: number }[]>([])
        const novaDescricaoGasto = ref('')
        const novoValorGasto = ref<number | null>(null)
        const editandoGastoId = ref<number | null>(null)
        const descricaoEditadaGasto = ref('')
        const valorEditadoGasto = ref<number | null>(null)

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

        const iniciarEdicaoGasto = (gasto: { id_gasto: number; descricao: string; valor: number }) => {
            editandoGastoId.value = gasto.id_gasto
            descricaoEditadaGasto.value = gasto.descricao
            valorEditadoGasto.value = gasto.valor
        }

        const salvarEdicaoGasto = async () => {
            const token = localStorage.getItem('token')
            if (!token || editandoGastoId.value === null || !descricaoEditadaGasto.value || !valorEditadoGasto.value) return

            try {
                await fetch(`http://localhost:3333/gasto/${editandoGastoId.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: descricaoEditadaGasto.value,
                        valor: valorEditadoGasto.value,
                    }),
                })

                editandoGastoId.value = null
                descricaoEditadaGasto.value = ''
                valorEditadoGasto.value = null
                await carregarGastos()
            } catch (err) {
                console.error('Erro ao editar gasto', err)
            }
        }

        const cancelarEdicaoGasto = () => {
            editandoGastoId.value = null
            descricaoEditadaGasto.value = ''
            valorEditadoGasto.value = null
        }

        const planejamentos = ref<{ id_planejamento: number; descricao: string; valor: number; valor_calculado: number }[]>([])
        const novaDescricaoPlanejamento = ref('')
        const novoPercentualPlanejamento = ref<number | null>(null)
        const editandoPlanejamentoId = ref<number | null>(null)
        const descricaoEditadaPlanejamento = ref('')
        const valorEditadoPlanejamento = ref<number | null>(null)

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

        const iniciarEdicaoPlanejamento = (p: { id_planejamento: number; descricao: string; valor: number }) => {
            editandoPlanejamentoId.value = p.id_planejamento
            descricaoEditadaPlanejamento.value = p.descricao
            valorEditadoPlanejamento.value = p.valor
        }

        const salvarEdicaoPlanejamento = async () => {
            const token = localStorage.getItem('token')
            if (!token || editandoPlanejamentoId.value === null || !descricaoEditadaPlanejamento.value || !valorEditadoPlanejamento.value) return

            try {
                await fetch(`http://localhost:3333/planejamento/${editandoPlanejamentoId.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        descricao: descricaoEditadaPlanejamento.value,
                        valor: valorEditadoPlanejamento.value,
                    }),
                })

                editandoPlanejamentoId.value = null
                descricaoEditadaPlanejamento.value = ''
                valorEditadoPlanejamento.value = null
                await carregarPlanejamentos()
            } catch (err) {
                console.error('Erro ao editar planejamento', err)
            }
        }

        const cancelarEdicaoPlanejamento = () => {
            editandoPlanejamentoId.value = null
            descricaoEditadaPlanejamento.value = ''
            valorEditadoPlanejamento.value = null
        }

        const excluirPlanejamento = async (id: number) => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                await fetch(`http://localhost:3333/planejamento/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                await carregarPlanejamentos()
            } catch (err) {
                console.error('Erro ao excluir planejamento', err)
            }
        }

        const logout = () => {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }

        onMounted(() => {
            const token = localStorage.getItem('token')
            if (token) {
                const decoded = jwtDecode<JwtPayload>(token);
                userEmail.value = decoded.email;
                userId.value = decoded.id_usuario;
            }
            console.log(userEmail.value);
            console.log(userId.value);

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
            editandoRendaId,
            descricaoEditada,
            valorEditado,
            iniciarEdicaoRenda,
            salvarEdicaoRenda,
            cancelarEdicaoRenda,
            editandoGastoId,
            descricaoEditadaGasto,
            valorEditadoGasto,
            iniciarEdicaoGasto,
            salvarEdicaoGasto,
            cancelarEdicaoGasto,
            editandoPlanejamentoId,
            descricaoEditadaPlanejamento,
            valorEditadoPlanejamento,
            iniciarEdicaoPlanejamento,
            salvarEdicaoPlanejamento,
            cancelarEdicaoPlanejamento,
            excluirPlanejamento
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