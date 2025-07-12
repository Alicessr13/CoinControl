<template>
  <div class="flex flex-col p-24 h-full w-full items-center bg-purple-50 text-black">

    <div class="min-w-[500px] flex flex-col gap-8" @click="$router.push('/')">
      <div class="flex items-center gap-4 mb-8 text-2xl cursor-pointer">
        <ArrowLeft class="" />
        <div>Voltar</div>
      </div>

      <div class="flex items-center justify-center gap-4 text-center">
        <CircleDollarSign :size="40" color="#9810fa" />
        <div class="text-5xl font-bold">Coin Control</div>
      </div>
      <div class="text-center text-2xl text-gray-600">Crie sua conta e comece a controlar suas finanças</div>

      <div v-if="error" class="">
        {{ error }}
      </div>

      <div class="flex min-w-[400px] flex-col gap-12 bg-white p-8 rounded-xl shadow-lg">

        <div class="text-4xl font-bold text-center">Realizar Cadastro</div>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <label class="text-3xl" for="email">Email</label>
            <input
              class="w-full text-2xl p-4 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400"
              id="email" v-model="email" type="email" placeholder="seu.email@exemplo.com" required />
          </div>

          <div class="flex flex-col gap-4">
            <label class="text-3xl" for="password">Senha</label>
            <input
              class="w-full text-2xl p-4 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400"
              id="password" v-model="password" type="password" placeholder="Crie uma senha segura" required />
          </div>

          <div class="flex flex-col gap-4">
            <label class="text-3xl" for="password">Confirmar Senha</label>
            <input
              class="w-full text-2xl p-4 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400"
              id="password" v-model="password" type="password" placeholder="Confirme sua senha" required />
          </div>

          <div class="flex items-center gap-4">
            <div @click="termsAccepted = !termsAccepted"
              class="w-6 h-6 rounded-full border border-purple-600/50 flex items-center justify-center cursor-pointer transition duration-200"
              :class="termsAccepted ? 'bg-purple-600 border-purple-600' : 'bg-transparent'">
              <Check v-if="termsAccepted" class="text-white transition-transform duration-200"
                :class="termsAccepted ? 'scale-100' : 'scale-0'" :size="16" />
            </div>
            <label for="terms" class="text-2xl text-black">Aceito os <a href="/terms"
                class="text-purple-600 hover:text-white">Termos de Serviço</a></label>
          </div>

          <div class="flex items-center gap-4">
            <div @click="notificationsEnabled = !notificationsEnabled"
              class="w-6 h-6 rounded-full border border-purple-600/50 flex items-center justify-center cursor-pointer transition duration-200"
              :class="notificationsEnabled ? 'bg-purple-600 border-purple-600' : 'bg-transparent'">
              <Check v-if="notificationsEnabled" class="text-white transition-transform duration-200"
                :class="notificationsEnabled ? 'scale-100' : 'scale-0'" :size="16" />
            </div>
            <label for="terms" class="text-2xl text-black">Desejo receber notificações por e-mail</label>
          </div>

          <div class="flex flex-col gap-4 bg-purple-100 p-4 rounded-lg">
            <div class="flex items-center gap-4 text-3xl">
              <ShieldCheck :size="20" color="#9810fa" />
              <div class="text-purple-600">Seus dados estão seguros</div>
            </div>
            <div class="text-2xl text-purple-600">Utilizamos criptografia de nível bancário para proteger suas informações pessoais.</div>
          </div>

          <button
            class="w-full text-3xl p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-black transition duration-200"
            type="submit" :disabled="isLoading">
            {{ isLoading ? 'Registrando...' : 'Registrar' }}
          </button>
        </form>

        <div class="border-t border-gray-300 w-full"></div>

        <p class="text-center text-3xl">
          Já tem uma conta? <a href="/login" class="text-purple-600 font-bold hover:text-purple-800">Faça login</a>
        </p>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeft, CircleDollarSign, Check, ShieldCheck } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    ArrowLeft,
    CircleDollarSign,
    Check,
    ShieldCheck
  },
  name: 'RegisterPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isLoading = ref(false);
    const termsAccepted = ref(false);
    const notificationsEnabled = ref(false);

    const router = useRouter();

    const handleRegister = async () => {
      error.value = '';
      isLoading.value = true;

      try {
        const response = await fetch('http://localhost:3333/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao registrar');
        }

        // Salva o token no localStorage
        localStorage.setItem('token', data.token);

        // Redireciona para a dashboard
        router.push('/dashboard');
      } catch (err: unknown) {
        error.value = err as string || 'Erro ao registrar';
      } finally {
        isLoading.value = false;
      }
    }

    return {
      email,
      password,
      error,
      isLoading,
      handleRegister,
      termsAccepted,
      notificationsEnabled
    }
  }
}
</script>

<style scoped></style>
