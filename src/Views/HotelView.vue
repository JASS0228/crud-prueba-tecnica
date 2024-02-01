<script setup lang="ts">
	import { useRoute } from 'vue-router'
	import { useGetHotel } from '../composables/useHotelQuery'
	import { formatCurrency } from '../helpers/formatCurrency'
	import { RouterLink } from 'vue-router'
	import Spinner from '../components/Spinner.vue'

	// Se instancia para obtener la información de toda la ruta
	const route = useRoute()

	// Se obtiene la data del hotel del id y su estado de carga
	const { data, isLoading, isError, error } = useGetHotel(+route.params.id)
</script>

<template>
	<div v-if="isLoading">
		<Spinner />
	</div>
	<div v-else>
		<div v-if="isError">
			<p>{{ error }}</p>
		</div>
		<div v-else>
			<div
				class="flex flex-col-reverse md:flex-row md:justify-between md:items-center mr-5">
				<div class="p-10">
					<h1 class="font-bold text-3xl text-center md:text-left">
						{{ data?.name }}
					</h1>
					<div
						class="flex flex-col justify-start items-center md:flex-row mt-3 gap-2">
						<p class="text-gray-500 text-1xl">{{ data?.city }}</p>
						<div class="flex">
							<svg
								v-for="i in Number(data?.rating)"
								:key="i"
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-yellow-500"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 3.293l2.146 4.612 4.826.702-3.5 3.407.826 4.818L10 14.159l-4.299 2.772.826-4.818-3.5-3.407 4.826-.702L10 3.293z"
									clip-rule="evenodd" />
							</svg>
						</div>
					</div>

					<div
						class="mt-2 flex items-center justify-center md:items-center md:justify-start">
						<p class="text-center w-96 md:text-justify">
							{{ data?.description }}
						</p>
					</div>

					<div
						class="font-bold text-center md:text-left mt-2 text-lg underline">
						Pago por noche: {{ formatCurrency(Number(data?.rate)) }}
						{{ data?.currency }}
					</div>

					<div class="mt-5">
						<RouterLink
							:to="{ name: 'Hotels' }"
							class="text-white bg-blue-500 block text-center md:inline-block p-3 rounded-xl hover:bg-blue-400 transition-colors font-bold text-lg">
							Regresar
						</RouterLink>
					</div>
				</div>
				<div>
					<img
						:src="data?.image"
						:alt="data?.name"
						class="rounded-lg shadow-lg w-full" />
				</div>
			</div>
		</div>
	</div>
</template>
