import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHotelStore = defineStore('hotel', () => {
	const hotels = ref([])

	return {
		hotels,
	}
})
