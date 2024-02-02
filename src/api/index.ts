import hotelsApi from '../Config'
import { HotelByID, HotelCreate } from '../types/hotelType'

// Obtiene todo los hoteles de la APi
const getHotels = async () => {
	return await hotelsApi.get('/hotels')
}

// Obtiene un hotel de la API por su id
const getHotel = async (id: number) => {
	return await hotelsApi.get<HotelByID>(`/hotels/${id}`)
}

const createHotel = async (hotel: HotelCreate) => {
	return await hotelsApi.post('/hotels', hotel, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

// Elimina un hotel de la API por su id
const deleteHotelById = async (id: number) => {
	return await hotelsApi.delete(`/hotels/${id}`)
}

export { getHotels, getHotel, deleteHotelById, createHotel }
