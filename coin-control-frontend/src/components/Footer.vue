<template>
	<div class="w-full flex justify-between bg-black text-white py-6 px-12 text-center">
		<div class="flex flex-col items-start justify-start w-full max-w-xl gap-6">
      <div class="text-4xl flex items-center gap-4">
        <CircleDollarSign :size="35" color="#9810fa" />
        <router-link to="/" class="hover:text-purple-600">
          Coin Control
        </router-link>
      </div>
			<div class="text-2xl text-start">
				A plataforma mais completa para gestão financeira pessoal e empresarial.
			</div>
      <div class="flex gap-4">
        <Instagram />
        <Linkedin />
        <Mail />
        <Github />
      </div>
		</div>

    <div class="flex flex-col gap-6 items-start justify-start text-start w-full max-w-xl ">
      <div class="text-3xl font-bold">Produto</div>
      <div class="flex flex-col gap-2 text-2xl">
        <span>Recursos</span>
        <span>Preços</span>
        <span>Api</span>
        <span>Integrações</span>
      </div>
    </div>

    <div class="flex flex-col gap-6 items-start justify-start text-start w-full max-w-xl ">
      <div class="text-3xl font-bold">Empresa</div>
      <div class="flex flex-col gap-2 text-2xl">
        <span>Sobre nós</span>
        <span>Carreiras</span>
        <span>Contato</span>
        <span>Blog</span>
      </div>
    </div>

    <div class="flex flex-col gap-6 items-start justify-start text-start w-full max-w-xl ">
      <div class="text-3xl font-bold">Suporte</div>
      <div class="flex flex-col gap-2 text-2xl">
        <span>Documentação</span>
        <span>Central de ajuda</span>
        <span>Status</span>
        <span>Segurança</span>
      </div>
    </div>
	</div>
</template>

<script lang="ts">
import { Instagram, Linkedin, Mail, Github, CircleDollarSign } from 'lucide-vue-next';

export default {
  components: {
    Instagram,
    Linkedin,
    Mail,
    Github,
    CircleDollarSign
  },
	name: 'FooterPage',
	data() {
		return {
			menuOpen: false
		}
	},
	methods: {
	}
}
</script>

<style scoped></style>
