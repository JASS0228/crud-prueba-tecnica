import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const getHotels = () => {
	return useQuery({
		queryKey: ['hotels'],
		queryFn: async () => {
			const res = await axios.get('https://test.devmx.site/api/hotels')
			return res
		},
	})
}

export { getHotels }
