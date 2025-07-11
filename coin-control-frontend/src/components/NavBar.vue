<template>
  <nav class="w-full">
    <div class="bg-black p-8 text-3xl text-white p-4 gap-8 flex justify-between items-center relative">
      <div class="text-5xl flex items-center gap-4">
        <CircleDollarSign :size="40" color="#9810fa" />
        <router-link to="/" class="hover:text-purple-600">
          Coin Control
        </router-link>

      </div>
      <!-- Botão hambúrguer visível apenas em mobile -->
      <button @click="toggleMenu" class="md:hidden text-white text-4xl">
        ☰
      </button>

      <ul class="hidden md:flex gap-8">
        <li class="">
          <router-link to="/" class="">Início</router-link>
        </li>
        <li class="">
          <router-link to="/about" class="">Planejamento</router-link>
        </li>
        <li class="">
          <router-link to="/dashboard" class="">Sobre</router-link>
        </li>
        <li class="">
          <router-link to="/contact" class="">Contato</router-link>
        </li>
      </ul>

      <div class="hidden md:flex gap-8">
        <button>Entrar</button>
        <button>Começar Grátis</button>
      </div>

      <Transition name="slide-fade">
        <div v-if="menuOpen"
          class="md:hidden absolute flex flex-col gap-8 p-8 rounded-xl top-22 right-0 bg-black text-white">

          <div class="flex flex-col text-start items-start gap-8">
            <button>Entrar</button>
            <button>Começar Grátis</button>
          </div>

          <ul class="flex flex-col gap-8">
            <li class="">
              <router-link to="/" class="">Início</router-link>
            </li>
            <li class="">
              <router-link to="/about" class="">Planejamento</router-link>
            </li>
            <li class="">
              <router-link to="/dashboard" class="">Sobre</router-link>
            </li>
            <li class="">
              <router-link to="/contact" class="">Contato</router-link>
            </li>
          </ul>

        </div>
      </Transition>

    </div>
  </nav>
</template>

<script lang="ts">
import { CircleDollarSign } from 'lucide-vue-next'

export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false
    }
  },
  components: {
    CircleDollarSign
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<style scoped>
.buttonClicked {
  background-color: #9810fa;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
