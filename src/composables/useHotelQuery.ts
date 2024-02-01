import { useMutation, useQuery } from '@tanstack/vue-query'
import { deleteHotelById, getHotel, getHotels } from '../api'
import { Hotels, Hotel } from '../types/hotelType'

// Este hook es para obtener los hoteles de la API con axios y vue-query
const useGetHotels = () => {
	return useQuery({
		queryKey: ['hotels'],
		queryFn: async () => {
			const res = await getHotels()
			return res.data
		},
		select(data: Hotels): Hotels {
			return data
		},
	})
}

// Este hook es para obtener un hotel de la API con axios y vue-query
const useGetHotel = (id: number) => {
	return useQuery({
		queryKey: ['hotel', id],
		queryFn: async () => {
			const res = await getHotel(id)
			return res.data
		},
		select(data) {
			return data.data
		},
	})
}

//Este hook sirve para eliminar un hotel de la API con axios y vue-query
const useDeleteHotelById = () => {
	return useMutation({
		mutationKey: ['deleteHotel'],
		onMutate: async (id: number) => {
			const res = await deleteHotelById(id)
			return res.data
		},
	})
}

export { useGetHotels, useGetHotel, useDeleteHotelById }
