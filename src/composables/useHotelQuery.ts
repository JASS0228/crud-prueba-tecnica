import { useQuery } from '@tanstack/vue-query'
import { getHotels } from '../api'
import { Hotels } from '../types/hotelType'

// Este hook es para obtener los hoteles de la API con axios y vue-query
const useGetHotels = () => {
	return useQuery({
		queryKey: ['hotels'],
		queryFn: async () => {
			const res = await getHotels()
			return res.data
		},
		select(data): Hotels {
			return data
		},
	})
}

export { useGetHotels }
