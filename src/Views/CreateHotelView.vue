<script setup lang="ts">
	import { ref } from 'vue'

	//Tipa de dato para el archivo
	const file = ref<File>()
	const name = ref('')
	const city = ref('')
	const rate = ref('')
	const rating = ref('')
	const currency = ref('')
	const description = ref('')

	const error = ref('')

	const resetAlert = () => {
		setTimeout(() => {
			error.value = ''
		}, 2000)
	}

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		if (target.files) {
			file.value = target.files[0]
		}
	}

	const handleSubmit = () => {
		//Validar que la imagen sea un archivo
		if (!file.value) {
			error.value = 'La imagen es requerida'
			resetAlert()
			return
		}

		//Validar que se una imagen con extensión jpg, jpeg o png
		if (!/\.(jpg|jpeg|png)$/.test(file.value.name)) {
			error.value = 'La imagen debe ser de tipo jpg, jpeg o png'
			resetAlert()
			return
		}

		// Validar que todos los campos estén llenos
		if (
			name.value === '' ||
			city.value === '' ||
			rate.value === '' ||
			rating.value === '' ||
			currency.value === '' ||
			description.value === ''
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

		// Validar que la moneda sea de 3 letras en mayúsculas
		if (!/^[A-Z]{3}$/.test(currency.value)) {
			error.value = 'La moneda debe ser de 3 letras en mayúsculas'
			resetAlert()
			return
		}

		// Enviar la datos a la api
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
			class="p-5 md:w-1/3"
			@submit.prevent="handleSubmit()">
			<div>
				<label
					for=""
					class="text-lg font-bold block mb-1"
					>Imagen del Hotel</label
				>
				<input
					type="file"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					@change="handleFileChange" />
			</div>

			<div
				class="mt-5 flex flex-col md:flex-row md:justify-between md:items-center md:gap-5 gap-2">
				<label
					for=""
					class="text-lg font-bold"
					>Nombre</label
				>
				<input
					type="text"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca el nombre del hotel"
					v-model="name" />

				<label
					for=""
					class="text-lg font-bold"
					>Ciudad</label
				>
				<input
					type="text"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca la ciudad del hotel"
					v-model="city" />
			</div>

			<div
				class="mt-5 flex flex-col md:flex-row md:justify-between md:items-center md:gap-5 gap-2">
				<label
					for=""
					class="text-lg font-bold"
					>Precio</label
				>
				<input
					type="text"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca el precio"
					v-model="rate" />

				<label
					for=""
					class="text-lg font-bold"
					>Rating</label
				>
				<input
					type="text"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca la calificación"
					v-model="rating" />
			</div>

			<div class="mt-5">
				<label
					for=""
					class="text-lg font-bold block mb-1"
					>Moneda</label
				>
				<input
					type="text"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca el tipo de Moneda USD, MXN, EUR, etc."
					v-model="currency" />
			</div>

			<div class="mt-5">
				<label
					for=""
					class="text-lg font-bold block mb-1"
					>Descripción</label
				>
				<textarea
					name=""
					id=""
					cols="30"
					rows="10"
					class="p-2 rounded-lg w-full placeholder:font-normal placeholder-gray-600 border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
					placeholder="Coloca la descripción del hotel"
					v-model="description"></textarea>
			</div>

			<input
				type="submit"
				class="bg-green-600 mt-3 w-full p-3 rounded-md text-white font-bold hover:bg-green-700 cursor-pointer transition-all"
				value="Registrar Hotel" />
		</form>
	</div>
</template>
