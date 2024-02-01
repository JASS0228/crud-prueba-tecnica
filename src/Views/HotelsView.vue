<script setup lang="ts">
	import HotelCard from '../components/HotelCard.vue'
	import Spinner from '../components/Spinner.vue'
	import {
		useDeleteHotelById,
		useGetHotels,
	} from '../composables/useHotelQuery'
	import Swal from 'sweetalert2'

	// Se obtiene la data de los hoteles y el estado de carga
	const { data, isLoading } = useGetHotels()

	const { mutate } = useDeleteHotelById()

	function deleteHotel(id: number, name: string): void {
		Swal.fire({
			title: '¿Estás seguro?',
			text: `Estas seguro de borrar el hotel con el nombre ${name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, borrarlo',
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
	<div v-if="isLoading">
		<Spinner />
	</div>
	<!-- Si se cargo se muestra el contenido -->
	<div v-else>
		<section
			class="grid grid-cols-1 gap-14 m-10 md:grid-cols-3 2xl:grid-cols-4">
			<!-- Se itera el data para obtener los hoteles -->
			<HotelCard
				v-for="hotel of data?.data"
				:key="hotel.id"
				:hotel="hotel"
				@delete-hotel="deleteHotel" />
		</section>
	</div>
</template>
