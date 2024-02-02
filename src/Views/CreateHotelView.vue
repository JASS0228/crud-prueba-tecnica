<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { useCreateHotel } from '../composables/useHotelQuery'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	//Tipa de dato para el archivo
	const image = ref('')
	const name = ref('')
	const city = ref('')
	const rate = ref(0)
	const rating = ref(0)
	const currency = ref('')
	const description = ref('')

	const error = ref('')

	const { mutate } = useCreateHotel()

	//Función para resetear el error
	const resetAlert = () => {
		setTimeout(() => {
			error.value = ''
		}, 2000)
	}

	const imagePreview = computed(() => {
		return image.value
			? image.value
			: 'https://placehold.co/700x400?text=Imagen+del+hotel'
	})

	//Función para manejar el envío del formulario
	const handleSubmit = async () => {
		// Validar que todos los campos estén llenos
		if (
			name.value === '' ||
			city.value === '' ||
			rate.value === 0 ||
			rating.value === 0 ||
			currency.value === '' ||
			description.value === '' ||
			image.value === ''
		) {
			error.value = 'Todos los campos son requeridos'
			resetAlert()
			return
		}

		// Validar que el precio y el rating sean números
		if (isNaN(Number(rate.value)) || isNaN(Number(rating.value))) {
			error.value = 'El precio y el rating deben ser números'
			resetAlert()
			return
		}

		//Validar que el numero no sea negativo o mayor del 1 al 5
		if (Number(rating.value) < 1 || Number(rating.value) > 5) {
			error.value = 'El rating debe ser de 1 a 5 y no puede ser negativo'
			resetAlert()
			return
		}

		//Validar que el precio no sea negativo o menor a 0
		if (Number(rate.value) < 0 || Number(rate.value) === 0) {
			error.value = 'El precio no puede ser negativo o igual a 0'
			resetAlert()
			return
		}

		// Validar que la moneda sea de 3 letras en mayúsculas
		if (!/^[A-Z]{3}$/.test(currency.value)) {
			error.value = 'La moneda debe ser de 3 letras en mayúsculas'
			resetAlert()
			return
		}

		// Enviar la datos a la api
		mutate({
			name: name.value,
			city: city.value,
			rate: rate.value.toString(),
			rating: rating.value.toString(),
			currency: currency.value,
			description: description.value,
			image: image.value,
		})

		resetAlert()

		// Limpiar el formulario
		image.value = ''
		name.value = ''
		city.value = ''
		rate.value = 0
		rating.value = 0
		currency.value = ''
		description.value = ''

		router.push({ name: 'Hotels' })
	}
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-3xl md:text-4xl font-bold text-center">Crear Hotel</h1>

		<div
			v-if="error"
			class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-5 w-full md:w-1/3"
			role="alert">
			<p class="font-bold">Error</p>
			<p>{{ error }}</p>
		</div>

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
						v-model="name" />
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
						v-model="city" />
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
						v-model="rate" />
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
						v-model="rating" />
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
						v-model="currency" />
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
					v-model="description"></textarea>
			</div>

			<div class="mt-5">
				<img
					:src="imagePreview"
					:alt="name"
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
					v-model="image" />
			</div>

			<input
				type="submit"
				class="bg-blue-500 mt-3 w-full p-2 rounded-lg text-white font-bold hover:bg-blue-600 cursor-pointer transition-all"
				value="Registrar Hotel" />
		</form>
	</div>
</template>
