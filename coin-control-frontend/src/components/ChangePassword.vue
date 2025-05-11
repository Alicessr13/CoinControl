<template>
    <div class="change-password-container">
        <div class="card">
            <h2 class="title">Alterar Senha</h2>
            <form @submit.prevent="handleSubmit" class="form">
                <div class="form-group">
                    <label for="currentPassword">Senha Atual</label>
                    <input id="currentPassword" type="password" v-model="currentPassword" required minlength="6" />
                </div>

                <div class="form-group">
                    <label for="newPassword">Nova Senha</label>
                    <input id="newPassword" type="password" v-model="newPassword" required minlength="6" />
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirmar Nova Senha</label>
                    <input id="confirmPassword" type="password" v-model="confirmPassword" required minlength="6" />
                </div>

                <div v-if="error" class="error-message">{{ error }}</div>
                <div v-if="success" class="success-message">{{ success }}</div>

                <button type="submit" class="btn" :disabled="loading">
                    {{ loading ? 'Processando...' : 'Salvar Alterações' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ChangePassword',
    setup() {
        const currentPassword = ref('');
        const newPassword = ref('');
        const confirmPassword = ref('');
        const loading = ref(false);
        const error = ref('');
        const success = ref('');

        const handleSubmit = async () => {
            error.value = '';
            success.value = '';

            if (newPassword.value !== confirmPassword.value) {
                error.value = 'A confirmação da nova senha não corresponde.';
                return;
            }

            loading.value = true;
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    error.value = 'Usuário não autenticado.';
                    return;
                }

                const response = await fetch('http://localhost:3333/auth/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        current_password: currentPassword.value,
                        password: newPassword.value,
                    }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Erro ao atualizar a senha');
                }

                success.value = 'Senha atualizada com sucesso.';
                currentPassword.value = '';
                newPassword.value = '';
                confirmPassword.value = '';
            } catch (err: unknown) {
                error.value = err as string;
            } finally {
                loading.value = false;
            }
        };

        return {
            currentPassword,
            newPassword,
            confirmPassword,
            loading,
            error,
            success,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
.change-password-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
}

.form-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    color: #e74c3c;
    margin-bottom: 1rem;
    text-align: center;
}

.success-message {
    color: #2ecc71;
    margin-bottom: 1rem;
    text-align: center;
}
</style>