<script setup lang="ts">
	import { formatCurrency } from '../helpers/formatCurrency'
	import { Hotel } from '../types/hotelType'

	//  Se establece las props que recibe el componente HotelCard
	defineProps<{ hotel: Hotel }>()

	//Se declaro un emit para borrar un hotel
	const emits = defineEmits<{
		(e: 'delete-hotel', id: number, name: string): void
	}>()
</script>

<template>
	<article class="bg-white rounded-md shadow-md">
		<div>
			<img
				:src="hotel.image"
				:alt="hotel.name"
				class="rounded shadow" />
		</div>
		<div class="m-3">
			<div class="flex items-center justify-between gap-2">
				<h2 class="text-xl font-bold">{{ hotel.name }}</h2>
				<div class="flex">
					<svg
						v-for="i in +hotel.rating"
						:key="i"
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-yellow-500"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 3.293l2.146 4.612 4.826.702-3.5 3.407.826 4.818L10 14.159l-4.299 2.772.826-4.818-3.5-3.407 4.826-.702L10 3.293z"
							clip-rule="evenodd" />
					</svg>
				</div>
			</div>
			<div>
				<p class="text-gray-500">{{ hotel.city }}</p>

				<p class="line-clamp-2 mt-2">
					{{ hotel.description }}
				</p>
			</div>
			<div class="flex justify-end items-center gap-1 mt-7">
				<p class="border-b-2 border-black font-semibold">
					{{ formatCurrency(+hotel.rate) }} {{ hotel.currency }}
				</p>
			</div>
			<div class="flex flex-row gap-2">
				<RouterLink
					:to="{ name: 'update-hotel', params: { id: hotel.id } }"
					class="text-white bg-teal-600 block text-center md:inline-block p-3 w-full rounded-xl hover:bg-teal-500 transition-colors font-bold text-lg mt-3">
					Actualizar
				</RouterLink>
				<RouterLink
					:to="{ name: 'hotel', params: { id: hotel.id } }"
					class="text-white bg-blue-600 block text-center md:inline-block p-3 w-full rounded-xl hover:bg-blue-500 transition-colors font-bold text-lg mt-3">
					Ver más
				</RouterLink>
				<button
					@click="emits('delete-hotel', hotel.id, hotel.name)"
					class="text-white bg-red-600 block text-center md:inline-block p-3 w-full rounded-xl hover:bg-red-500 transition-colors font-bold text-lg mt-3">
					Borrar
				</button>
			</div>
		</div>
	</article>
</template>
