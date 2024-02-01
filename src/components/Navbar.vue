<script setup lang="ts">
	import { RouterLink } from 'vue-router'
</script>

<template>
	<nav>
		<ul
			class="flex flex-col items-center justify-around md:flex-row md:items-center md:justify-start md:gap-6">
			<li>
				<RouterLink
					:to="{ name: 'Hotels' }"
					class="text-2xl font-bold text-gray-800 hover:text-gray-400 transition-all"
					exact-active-class="underline"
					>Hotels</RouterLink
				>
			</li>
			<li>
				<RouterLink
					:to="{ name: 'crear-hotel' }"
					class="text-2xl font-semibold text-gray-800 hover:text-gray-400 transition-all"
					exact-active-class="underline"
					>Crear Hotel</RouterLink
				>
			</li>
		</ul>
	</nav>
</template>
