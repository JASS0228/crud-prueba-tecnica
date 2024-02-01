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
					class="text-4xl font-bold text-gray-800 hover:text-gray-500 transition-all"
					exact-active-class="underline text-gray-500"
					>Hotels</RouterLink
				>
			</li>
			<li>
				<RouterLink
					:to="{ name: 'crear-hotel' }"
					class="text-4xl font-semibold text-gray-600 hover:text-gray-500 transition-all"
					exact-active-class="underline text-gray-500"
					>Crear Hotel</RouterLink
				>
			</li>
		</ul>
	</nav>
</template>
