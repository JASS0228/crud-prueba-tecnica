<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router'
	import { useDeleteHotelById, useGetHotel } from '../composables/useHotelQuery'
	import { formatCurrency } from '../helpers/formatCurrency'
	import { RouterLink } from 'vue-router'
	import Spinner from '../components/Spinner.vue'
	import Swal from 'sweetalert2'

	// Se instancia para obtener la información de toda la ruta
	const route = useRoute()
	const router = useRouter()

	// Se obtiene la data del hotel del id y su estado de carga
	const { data, isLoading, isError, error } = useGetHotel(+route.params.id)

	// Se obtiene la función para eliminar un hotel
	const { mutate } = useDeleteHotelById()

	// Función para eliminar un hotel con SweetAlert para confirmar si va borrar o no
	//Muestra un mensaje de confirmación
	function deleteHotel(id: number, name: string): void {
		Swal.fire({
			title: '¿Estás seguro?',
			text: `¡No podrás revertir esto!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, bórralo',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				mutate(id)
				Swal.fire('¡Eliminado!', `${name} ha sido eliminado.`, 'success')
				setTimeout(() => {
					router.push({ name: 'Hotels' })
				}, 1000)
			}
		})
	}
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
				<div class="p-5">
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
						<p class="text-justify w-96 md:text-justify">
							{{ data?.description }}
						</p>
					</div>

					<div
						class="font-bold text-center md:text-left mt-2 text-lg underline">
						Pago por noche: {{ formatCurrency(Number(data?.rate)) }}
						{{ data?.currency }}
					</div>

					<div class="grid grid-cols-3 gap-4 mt-5">
						<RouterLink
							:to="{ name: 'update-hotel', params: { id: data?.id } }"
							class="text-white bg-teal-600 text-center block md:inline-block p-3 w-full rounded-xl hover:bg-teal-500 transition-colors font-bold text-lg mt-3">
							Actualizar
						</RouterLink>
						<button
							@click="deleteHotel(data!.id, data!.name)"
							class="text-white bg-red-600 text-center block md:inline-block p-3 w-full rounded-xl hover:bg-red-500 transition-colors font-bold text-lg mt-3">
							Borrar
						</button>
						<RouterLink
							:to="{ name: 'Hotels' }"
							class="text-white bg-blue-500 text-center block md:inline-block p-3 w-full rounded-xl hover:bg-blue-400 transition-colors font-bold text-lg mt-3">
							Regresar
						</RouterLink>
					</div>
				</div>
				<div>
					<img
						:src="data?.image"
						:alt="data?.name"
						class="rounded-lg shadow-lg w-100" />
				</div>
			</div>
		</div>
	</div>
</template>
