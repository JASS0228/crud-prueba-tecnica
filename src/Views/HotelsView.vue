<script setup lang="ts">
	import HotelCard from '../components/HotelCard.vue'
	import Spinner from '../components/Spinner.vue'
	import { getHotels } from '../composables/useHotelQuery'

	const { data, isLoading } = getHotels()
	console.log(data.value?.data)
	console.log(isLoading.value)
</script>

<template>
	<div>
		<h1 class="text-3xl md:text-4xl font-bold text-center mt-6 mb-2">
			Listado de Hoteles
		</h1>
	</div>

	<div v-if="isLoading">
		<Spinner />
	</div>
	<div v-else>
		<section
			class="grid grid-cols-1 gap-14 m-10 md:grid-cols-3 2xl:grid-cols-4">
			<HotelCard
				v-for="hotel in data?.data.data"
				:key="hotel" />
		</section>
	</div>
</template>
