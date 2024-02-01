<script setup lang="ts">
	import HotelCard from '../components/HotelCard.vue'
</script>

<template>
	<div>
		<h1 class="text-3xl md:text-4xl font-bold text-center mt-6 mb-2">
			Listado de Hoteles
		</h1>
	</div>

	<section class="grid grid-cols-2 gap-14 m-10 md:grid-cols-4">
		<HotelCard
			v-for="hotel in 20"
			:key="hotel" />
	</section>
</template>
