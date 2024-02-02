import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHotels, getHotel } from '../api/index'
import { HotelByID, Hotels } from '../types/hotelType'

export const useHotelStore = defineStore('hotel', () => {
	const hotels = ref<Hotels>()
	const hotel = ref<HotelByID>()
	const errors = ref()
	const isLoading = ref(true)

	// Se hace un fetch de los hoteles
	async function fetchHotels() {
		try {
			isLoading.value = true
			const { data } = await getHotels()
			hotels.value = data
		} catch (error) {
			errors.value = error
		} finally {
			isLoading.value = false
		}
	}

	async function fetchHotel(id: number) {
		try {
			isLoading.value = true
			const { data } = await getHotel(id)
			hotel.value = data
		} catch (error) {
			console.log(error)
		} finally {
			isLoading.value = false
		}
	}

	return {
		hotels,
		hotel,
		errors,
		isLoading,
		fetchHotels,
		fetchHotel,
	}
})
