<script setup lang="ts">
	import { computed, reactive } from 'vue'
	import { useCreateHotel } from '../composables/useHotelQuery'
	import { useRouter } from 'vue-router'
	import Alert from '../components/Alert.vue'

	const router = useRouter()

	const hotel = reactive({
		name: '',
		city: '',
		rate: 0,
		rating: 0,
		currency: '',
		description: '',
		image: '',
	})

	const alert = reactive({
		message: '',
		type: false,
	})

	const { mutate } = useCreateHotel()

	//Función para resetear el error
	const resetAlert = () => {
		setTimeout(() => {
			alert.message = ''
			alert.type = false
		}, 2000)
	}

	const imagePreview = computed(() => {
		return hotel.image
			? hotel.image
			: 'https://placehold.co/700x400?text=Imagen+del+hotel'
	})

	//Función para manejar el envío del formulario
	const handleSubmit = async () => {
		const { city, currency, description, image, name, rate, rating } = hotel

		// Validar que todos los campos estén llenos
		if (
			name === '' ||
			city === '' ||
			rate === 0 ||
			rating === 0 ||
			currency === '' ||
			description === '' ||
			image === ''
		) {
			alert.message = 'Todos los campos son requeridos'
			alert.type = true
			resetAlert()
			return
		}

		// Validar que el precio y el rating sean números
		if (isNaN(Number(rate)) || isNaN(Number(rating))) {
			alert.message = 'El precio y el rating deben ser números'
			alert.type = true
			resetAlert()
			return
		}

		//Validar que el numero no sea negativo o mayor del 1 al 5
		if (Number(rating) < 1 || Number(rating) > 5) {
			alert.message = 'El rating debe ser de 1 a 5 y no puede ser negativo'
			alert.type = true
			resetAlert()
			return
		}

		//Validar que el precio no sea negativo o menor a 0
		if (Number(rate) < 0 || Number(rate) === 0) {
			alert.message = 'El precio no puede ser negativo o igual a 0'
			alert.type = true
			resetAlert()
			return
		}

		// Validar que la moneda sea de 3 letras en mayúsculas
		if (!/^[A-Z]{3}$/.test(currency)) {
			alert.message = 'La moneda debe ser de 3 letras en mayúsculas'
			alert.type = true
			resetAlert()
			return
		}

		// Enviar la datos a la api
		mutate({
			name,
			city,
			rate: rate.toString(),
			rating: rating.toString(),
			currency,
			description,
			image,
		})

		alert.message = 'Hotel modificado correctamente'
		alert.type = false

		resetAlert()

		// Limpiar el formulario
		Object.assign(hotel, {
			name: '',
			city: '',
			rate: 0,
			rating: 0,
			currency: '',
			description: '',
			image: '',
		})

		// Redirigir a la lista de hoteles
		setTimeout(() => {
			router.push({ name: 'Hotels' })
		}, 2000)
	}
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-3xl md:text-4xl font-bold text-center">Crear Hotel</h1>

		<Alert
			:message="alert.message"
			:type="alert.type" />

		<form
			action=""
			class="p-10 bg-white rounded-lg shadow-lg mt-3 w-full md:w-1/3"
			@submit.prevent="handleSubmit()">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div>
					<label
						for="nombre"
						class="text-lg font-bold block"
						>Nombre</label
					>
					<input
						id="nombre"
						name="nombre"
						type="text"
						class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
						placeholder="Coloca el nombre del hotel"
						v-model="hotel.name" />
				</div>

				<div>
					<label
						for="ciudad"
						class="text-lg font-bold"
						>Ciudad</label
					>
					<input
						id="ciudad"
						name="ciudad"
						type="text"
						class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
						placeholder="Coloca la ciudad del hotel"
						v-model="hotel.city" />
				</div>
			</div>

			<div></div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
				<div>
					<label
						for="precio"
						class="text-lg font-bold"
						>Precio</label
					>
					<input
						id="precio"
						name="precio"
						type="Number"
						value="0"
						class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
						v-model="hotel.rate" />
				</div>

				<div>
					<label
						for="rating"
						class="text-lg font-bold"
						>Rating</label
					>
					<input
						id="rating"
						name="rating"
						type="Number"
						value="0"
						class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
						v-model="hotel.rating" />
				</div>

				<div>
					<label
						for="moneda"
						class="text-lg font-bold"
						>Moneda</label
					>
					<input
						id="moneda"
						name="moneda"
						type="text"
						class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
						placeholder="Moneda USD, MXN"
						v-model="hotel.currency" />
				</div>
			</div>

			<div class="mt-5">
				<label
					for="description"
					class="text-lg font-bold block mb-1"
					>Descripción</label
				>
				<textarea
					name="description"
					id="description"
					cols="10"
					rows="3"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca la descripción del hotel"
					v-model="hotel.description"></textarea>
			</div>

			<div class="mt-5">
				<img
					:src="imagePreview"
					:alt="hotel.name"
					class="rounded-lg" />

				<label
					for="image"
					class="text-lg font-bold block mb-1"
					>Imagen</label
				>
				<input
					type="text"
					name="image"
					id="image"
					placeholder="Coloca la url de la imagen"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					v-model="hotel.image" />
			</div>

			<input
				type="submit"
				class="bg-blue-500 mt-3 w-full p-2 rounded-lg text-white font-bold hover:bg-blue-600 cursor-pointer transition-all"
				value="Registrar Hotel" />
		</form>
	</div>
</template>
