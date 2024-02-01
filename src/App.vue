<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import NavBar from './components/Navbar.vue'
</script>

<template>
	<header class="bg-white p-5 shadow-md mb-5">
		<NavBar />
	</header>
	<main>
		<RouterView />
	</main>
</template>
