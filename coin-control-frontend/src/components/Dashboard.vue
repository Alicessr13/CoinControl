<template>
  <div class="flex flex-col gap-8 p-24 h-full w-full items-center ">
    <h1 class="text-6xl font-bold">Planejamento Financeiro</h1>
    <p class="text-3xl text-gray-600">Gerencie suas finanças de forma simples e eficiente</p>
    <!--             <p class="dashboard-email">Usuário: {{ userEmail }}</p> -->

    <div class="flex w-full gap-18">

      <div class="border border-gray-400/50 rounded-lg p-8 w-3/5">
        <div class="flex justify-between items-center">
          <div class="text-3xl">Total Renda</div>
          <ChartNoAxesCombined :size="20" />
        </div>
        <div class="text-5xl pt-6 font-bold text-purple-600">
          R$ {{ totalRenda }}
        </div>
      </div>

      <div class="border border-gray-400/50 rounded-lg p-8 w-3/5">
        <div class="flex justify-between items-center">
          <div class="text-3xl">Total Gastos</div>
          <ChartNoAxesCombined :size="20" />
        </div>
        <div class="text-5xl pt-6 font-bold text-red-600">
          R$ {{ totalGasto.toFixed(2) }}
        </div>
      </div>

      <div class="border border-gray-400/50 rounded-lg p-8 w-3/5">
        <div class="flex justify-between items-center">
          <div class="text-3xl">Total Planejamento</div>
          <ChartNoAxesCombined :size="20" />
        </div>
        <div class="text-5xl pt-6 font-bold text-blue-600">
          R$ {{ totalPlanejamento.toFixed(2) }}
        </div>
      </div>

      <div class="border border-gray-400/50 rounded-lg p-8 w-3/5">
        <div class="flex justify-between items-center">
          <div class="text-3xl">Disponivel</div>
          <ChartNoAxesCombined :size="20" />
        </div>
        <div class="text-5xl pt-6 font-bold text-green-600">
          R$ {{ (totalRenda - totalGasto - totalPlanejamento).toFixed(2) }}
        </div>
      </div>
    </div>

    <div class="flex w-full gap-18">

      <div class="w-1/2 flex flex-col gap-8">
        <div class="w-full flex bg-gray-200/50 p-2 gap-2 rounded-lg">
          <div class="w-1/3 text-center p-4 text-3xl rounded-lg" :class="menuRendaOpen ? 'bg-white' : ''"
            @click="openMenuRenda()">Renda</div>
          <div class="w-1/3 text-center p-4 text-3xl rounded-lg" :class="menuGastoOpen ? 'bg-white' : ''"
            @click="openMenuGasto()">Gastos</div>
          <div class="w-1/3 text-center p-4 text-3xl rounded-lg" :class="menuPlanejamentoOpen ? 'bg-white' : ''"
            @click="openMenuPlanejamento()">Planejamento
          </div>
        </div>

        <div v-if="menuRendaOpen" class="flex flex-col gap-8">
          <div class="w-full flex flex-col gap-6 p-8 border border-gray-200 rounded-lg">
            <div class="text-4xl font-bold">Adicionar Renda</div>

            <div class="flex items-center gap-8">
              <div class="w-1/2">
                <div class="text-3xl pb-4">Descrição</div>
                <input v-model="novaDescricao" placeholder="Ex: Salário"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
              <div class="w-1/2">
                <div class="text-3xl pb-4">Valor</div>
                <input v-model.number="novoValor" placeholder="0,00" type="number"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
            </div>
            <button @click="criarRenda"
              class="bg-purple-600 rounded-lg p-6 text-white text-2xl w-full flex items-center justify-center gap-4 cursor-pointer hover:bg-purple-700 transition duration-200">
              <Plus />
              <div>Adicionar Renda</div>
            </button>
          </div>

          <div v-if="rendas.length > 0" class="flex flex-col gap-6">
            <div v-for="renda in rendas" :key="renda.id_renda">
              <div v-if="editandoRendaId === renda.id_renda"
                class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <input v-model="descricaoEditada" />
                <div class="flex items-center gap-6">
                  <input v-model.number="valorEditado" class="text-end text-purple-600 font-bold" type="number" />
                  <button @click="salvarEdicaoRenda">
                    <Check />
                  </button>
                  <button @click="cancelarEdicaoRenda">
                    <XCircle />
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <span>{{ renda.descricao }}</span>
                <div class="flex items-center gap-6">
                  <span class="text-purple-600 font-bold">R$ {{ renda.valor }}</span>
                  <button @click="iniciarEdicaoRenda(renda)">
                    <Pencil />
                  </button>
                  <button @click="excluirRenda(renda.id_renda)">
                    <X />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="menuGastoOpen" class="flex flex-col gap-8">
          <div class="w-full flex flex-col gap-6 p-8 border border-gray-200 rounded-lg">
            <div class="text-4xl font-bold">Adicionar Gasto</div>

            <div class="flex items-center gap-8">
              <div class="w-1/2">
                <div class="text-3xl pb-4">Descrição</div>
                <input v-model="novaDescricaoGasto" placeholder="Ex: Mercado"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
              <div class="w-1/2">
                <div class="text-3xl pb-4">Valor</div>
                <input v-model.number="novoValorGasto" placeholder="0,00" type="number"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
            </div>
            <button @click="criarGasto"
              class="bg-purple-600 rounded-lg p-6 text-white text-2xl w-full flex items-center justify-center gap-4 cursor-pointer hover:bg-purple-700 transition duration-200">
              <Plus />
              <div>Adicionar Gasto</div>
            </button>
          </div>

          <div v-if="gastos.length > 0" class="flex flex-col gap-6">
            <div v-for="gasto in gastos" :key="gasto.id_gasto">
              <div v-if="editandoGastoId === gasto.id_gasto"
                class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <input v-model="descricaoEditadaGasto" />
                <div class="flex items-center gap-6">
                  <input v-model.number="valorEditadoGasto" class="text-end text-purple-600 font-bold" type="number" />
                  <button @click="salvarEdicaoGasto">
                    <Check />
                  </button>
                  <button @click="cancelarEdicaoGasto">
                    <XCircle />
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <span>{{ gasto.descricao }}</span>
                <div class="flex items-center gap-6">
                  <span class="text-purple-600 font-bold">R$ {{ gasto.valor }}</span>
                  <button @click="iniciarEdicaoGasto(gasto)">
                    <Pencil />
                  </button>
                  <button @click="excluirGasto(gasto.id_gasto)">
                    <X />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div v-if="menuPlanejamentoOpen" class="flex flex-col gap-8">
          <div class="w-full flex flex-col gap-6 p-8 border border-gray-200 rounded-lg">
            <div class="text-4xl font-bold">Adicionar Planejamento</div>

            <div class="flex items-center gap-8">
              <div class="w-1/2">
                <div class="text-3xl pb-4">Descrição</div>
                <input v-model="novaDescricaoPlanejamento" placeholder="Ex: Reserva de emergência"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
              <div class="w-1/2">
                <div class="text-3xl pb-4">Percentual</div>
                <input v-model.number="novoPercentualPlanejamento" placeholder="% do restante" type="number"
                  class="border border-gray-200 rounded-lg p-4 text-2xl w-full" />
              </div>
            </div>
            <button @click="criarPlanejamento"
              class="bg-purple-600 rounded-lg p-6 text-white text-2xl w-full flex items-center justify-center gap-4 cursor-pointer hover:bg-purple-700 transition duration-200">
              <Plus />
              <div>Adicionar Planejamento</div>
            </button>
          </div>

          <div v-if="planejamentos.length > 0" class="flex flex-col gap-6">
            <div v-for="p in planejamentos" :key="p.id_planejamento">
              <div v-if="editandoPlanejamentoId === p.id_planejamento"
                class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <input v-model="descricaoEditadaPlanejamento" />
                <div class="flex items-center gap-6">
                  <input v-model.number="valorEditadoPlanejamento" class="text-end text-purple-600 font-bold"
                    type="number" />
                  <span class="text-purple-600 font-bold">%</span>
                  <button @click="salvarEdicaoPlanejamento">
                    <Check />
                  </button>
                  <button @click="cancelarEdicaoPlanejamento">
                    <XCircle />
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center justify-between text-4xl rounded-lg p-6 border border-gray-200">
                <div class="flex flex-col">
                  <span>{{ p.descricao }}</span>
                  <span class="text-2xl text-gray-600">Valor calculado: R$ {{ p.valor_calculado }}</span>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-purple-600 font-bold">{{ p.valor }}%</span>
                  <button @click="iniciarEdicaoPlanejamento(p)">
                    <Pencil />
                  </button>
                  <button @click="excluirPlanejamento(p.id_planejamento)">
                    <X />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/2 bg-black">
        <div>teste</div>
      </div>
    </div>


    <!-- <button class="" @click="logout">Sair</button>
      <button>
        <a href="/change-password">Alterar Senha</a>
      </button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { ChartNoAxesCombined, Plus, X, XCircle, Pencil, Check } from 'lucide-vue-next';

interface JwtPayload {
  id_usuario: number
  email: string
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  components: {
    ChartNoAxesCombined,
    Plus,
    X,
    XCircle,
    Pencil,
    Check
  },
  setup() {
    const userEmail = ref('')
    const userId = ref<number | null>(null)

    const menuRendaOpen = ref(false);
    const menuGastoOpen = ref(false);
    const menuPlanejamentoOpen = ref(false);

    const openMenuRenda = () => {
      menuRendaOpen.value = true;
      menuGastoOpen.value = false;
      menuPlanejamentoOpen.value = false;
    }

    const openMenuGasto = () => {
      menuGastoOpen.value = true;
      menuRendaOpen.value = false;
      menuPlanejamentoOpen.value = false;
    }

    const openMenuPlanejamento = () => {
      menuPlanejamentoOpen.value = true;
      menuRendaOpen.value = false;
      menuGastoOpen.value = false;
    }

    const rendas = ref<{ id_renda: number; descricao: string; valor: number }[]>([])
    const novaDescricao = ref('')
    const novoValor = ref<number | null>(null)
    const editandoRendaId = ref<number | null>(null)
    const descricaoEditada = ref('')
    const valorEditado = ref<number | null>(null)
    const totalRenda = ref(0);

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
        totalRenda.value = rendas.value.reduce((acc, renda) => acc + Number(renda.valor), 0);
        console.log('rendas', rendas.value);
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
    const totalGasto = ref(0);

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
        totalGasto.value = gastos.value.reduce((acc, gasto) => acc + Number(gasto.valor), 0);
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
    const totalPlanejamento = ref(0);

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
        totalPlanejamento.value = planejamentos.value.reduce((acc, p) => acc + Number(p.valor_calculado), 0);
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

      menuRendaOpen.value = true;

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
      excluirPlanejamento,
      totalRenda,
      totalGasto,
      totalPlanejamento,
      menuRendaOpen,
      menuGastoOpen,
      menuPlanejamentoOpen,
      openMenuRenda,
      openMenuGasto,
      openMenuPlanejamento
    }
  },
})
</script>

<style scoped></style>
