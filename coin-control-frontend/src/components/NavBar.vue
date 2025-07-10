<template>
  <nav class="w-full">
    <div class="bg-black p-8 text-3xl text-white p-4 flex justify-between items-center">
      <div class="text-5xl flex items-center gap-4">
        <DollarIcon :size="40" color="#9810fa" />
        <router-link to="/" class="hover:text-purple-600">
          Coin Control
        </router-link>

      </div>

      <ul class="flex gap-8">
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

      <div class="flex gap-8">
          <button>Entrar</button>
          <button>Começar Grátis</button>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import DollarIcon from './icons/DollarIcon.vue'

export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false
    }
  },
  components: {
    DollarIcon,
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      const menu = document.querySelector('.nav-menu')
      menu?.classList.toggle('active')
    }
  }
}
</script>

<style scoped>

.buttonClick{
  background-color: #9810fa;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

</style>
