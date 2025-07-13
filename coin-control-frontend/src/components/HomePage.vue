<template>
  <div class="w-full h-full flex flex-col gap-14 items-center justify-center bg-purple-50">
    <div class="bg-purple-100 text-purple-900 text-3xl p-4 rounded-full">
      🚀 Nova plataforma de controle financeiro
    </div>

    <div class="text-8xl font-bold text-center ">
      Controle total das suas
      <div class="rainbow-text">finanças</div>
    </div>
    <div class="text-4xl text-center text-gray-700">
      Gerencie seus investimentos, despesas e receitas em uma plataforma moderna e intuitiva.
    </div>
    <div class="text-4xl text-center text-gray-700">
      Tenha o controle financeiro que você sempre quis.
    </div>

    <div class="flex items-center gap-4 text-4xl bg-purple-600 text-white p-6 rounded-4xl cursor-pointer" @click="$router.push('/register')">
      Começar agora <ArrowRight color="white" :size="30"/>
    </div>

    <div class="flex items-center gap-24">
      <div class="text-2xl text-gray-700 flex items-center gap-4">
        <div class="w-8 h-8 rainbow-gradient rounded-full mr-2"></div>
        Gratuito para começar
      </div>
      <div class="text-2xl text-gray-700 flex items-center gap-4">
        <div class="w-8 h-8 rainbow-gradient rounded-full mr-2"></div>
        Segurança bancária
      </div>
      <div class="text-2xl text-gray-700 flex items-center gap-4">
        <div class="w-8 h-8 rainbow-gradient rounded-full mr-2"></div>
        Suporte 24/7
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ArrowRight } from 'lucide-vue-next';

export default {
  name: 'HomePage',
  components: {
    ArrowRight
  },
  data() {
  },
  methods: {

  }
}

</script>
