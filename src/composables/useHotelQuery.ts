import { useQuery } from '@tanstack/vue-query'
import { getHotels } from '../api'
import { Hotels } from '../types/hotelType'

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
