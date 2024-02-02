<script setup lang="ts">
	import HotelCard from '../components/HotelCard.vue'
	import Spinner from '../components/Spinner.vue'
	import Swal from 'sweetalert2'
	import { useDeleteHotelById } from '../composables/useHotelQuery'
	import { onMounted } from 'vue'
	import { useHotelStore } from '../store/hotel'

	const hotelStore = useHotelStore()

	onMounted(async () => {
		await hotelStore.fetchHotels()
	})

	// Se obtiene la función para eliminar un hotel
	const { mutate } = useDeleteHotelById()

	// Función para eliminar un hotel con SweetAlert para confirmar si va borrar o no
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
				if (hotelStore.hotels?.data) {
					hotelStore.hotels!.data = hotelStore.hotels?.data.filter(
						(hotel) => hotel.id !== id
					)
				}
			}
		})
	}
</script>

<template>
	<div>
		<h1 class="text-3xl md:text-4xl font-bold text-center mt-6 mb-2">
			Listado de Hoteles
		</h1>
	</div>

	<!-- Se muestra el spinner mientras se carga la data -->
	<div v-if="hotelStore.isLoading">
		<Spinner />
	</div>
	<!-- Si se cargo se muestra el contenido -->
	<div v-else>
		<section
			class="grid grid-cols-1 gap-14 m-10 md:grid-cols-3 2xl:grid-cols-4">
			<!-- Se itera el data para obtener los hoteles -->
			<HotelCard
				v-for="hotel of hotelStore.hotels?.data"
				:key="hotel.id"
				:hotel="hotel"
				@delete-hotel="deleteHotel" />
		</section>
	</div>
</template>
