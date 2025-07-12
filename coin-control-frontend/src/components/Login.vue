<template>
  <div class="flex flex-col gap-12 p-24 h-full w-full items-center justify-center bg-black  text-white">

    <div class="text-7xl font-bold">
      Entre na sua <span class="rainbow-text">conta</span>
    </div>

    <div class="text-3xl">
      Acesse sua conta para gerenciar suas finanças
    </div>

    <div class="flex min-w-[400px] flex-col gap-12 bg-gray-900/50 p-8 border border-purple-500/40 rounded-lg shadow-lg">

      <div class="text-5xl text-center font-bold">Login</div>

      <form class="flex flex-col gap-12" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <label class="text-3xl" for="email">Email</label>
          <input
            class="w-full text-2xl p-4 bg-gray-800/50 border-gray-700 rounded-lg text-white placeholder:text-gray-400"
            id="email" v-model="email" type="email" placeholder="Seu email" required />
        </div>

        <div class="flex flex-col gap-4">
          <label class="text-3xl" for="password">Senha</label>
          <input
            class="w-full text-2xl p-4 bg-gray-800/50 border-gray-700 rounded-lg text-white placeholder:text-gray-400"
            id="password" v-model="password" type="password" placeholder="Sua senha" required />
        </div>

        <div class="flex flex-col gap-4 items-start justify-between md:flex-row">
          <div class="flex items-center gap-4">
            <div @click="remember = !remember"
              class="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center cursor-pointer transition duration-200"
              :class="remember ? 'bg-purple-600 border-purple-600' : 'bg-transparent'">
              <Check v-if="remember" class="text-white transition-transform duration-200"
                :class="remember ? 'scale-100' : 'scale-0'" :size="16" />
            </div>
            <!-- <input type="checkbox" id="remember" v-model="remember"
            class="appearance-none w-6 h-6 rounded-full border border-white/50 checked:bg-purple-600 checked:border-purple-600 transition duration-200 cursor-pointer" /> -->
            <label for="remember" class="text-2xl text-white">Lembrar-me</label>
          </div>
          <div class="flex items-center justify-end">
            <a href="/forgot-password" class="text-purple-600 hover:text-white text-2xl">Esqueci minha senha</a>
          </div>
        </div>

        <button
          class="w-full text-3xl p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-black transition duration-200"
          type="submit" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      <div v-if="error" class="text-red-500 text-2xl text-center">
        {{ error }}
      </div>

      <div class="text-center text-2xl">
        Não tem uma conta? <a href="/register" class="text-purple-600 hover:text-white text-2xl">Criar conta</a>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Check } from 'lucide-vue-next'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Check
  },
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isLoading = ref(false);
    const remember = ref(false);

    const router = useRouter();


    const handleLogin = async () => {
      error.value = '';
      isLoading.value = true;

      try {
        const response = await fetch('http://localhost:3333/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            remember: remember.value
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao fazer login');
        }

        // Salvar o token no localStorage
        localStorage.setItem('token', data.token);

        // Redirecionar para a página principal
        router.push('/dashboard');
      } catch (err) {
        error.value = err as string || 'Credenciais inválidas';
      } finally {
        isLoading.value = false;
      }
    }

    return {
      email,
      password,
      error,
      isLoading,
      remember,
      handleLogin
    };
  }
}
</script>

<style scoped></style>
