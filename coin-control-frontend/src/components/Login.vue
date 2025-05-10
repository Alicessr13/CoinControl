<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Coin Control</h1>
      <p class="login-subtitle">Entre em sua conta</p>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Seu email" required class="form-input" />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input id="password" v-model="password" type="password" placeholder="Sua senha" required class="form-input" />
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="register-text">
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.isLoading = true;

      try {
        const response = await fetch('http://localhost:3333/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao fazer login');
        }

        // Salvar o token no localStorage
        localStorage.setItem('token', data.token);

        // Redirecionar para a página principal
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.message || 'Credenciais inválidas';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.login-subtitle {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #7f8c8d;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: #2c3e50;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2980b9;
}

.login-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffdddd;
  color: #d63031;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.register-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.register-text a {
  color: #3498db;
  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>