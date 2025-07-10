<template>
	<div class="app-container">
		<NavBar />
		<main class="main-content">
			<router-view />
		</main>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
// não importa o LoginPage diretamente aqui
</script>

<style scoped>
.app-container {
	min-height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		"header"
		"main"
		"footer";
}

.main-content {
	grid-area: main;
}
</style>
