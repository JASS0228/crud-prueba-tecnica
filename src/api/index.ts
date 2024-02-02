import hotelsApi from '../Config'
import { Hotel, HotelByID, HotelCreate } from '../types/hotelType'

// Obtiene todo los hoteles de la APi
const getHotels = async () => {
	return await hotelsApi.get('/hotels')
}

// Obtiene un hotel de la API por su id
const getHotel = async (id: number) => {
	return await hotelsApi.get<HotelByID>(`/hotels/${id}`)
}

// Se crea un hotel en la API
const createHotel = async (hotel: HotelCreate) => {
	return await hotelsApi.post('/hotels', hotel)
}

// Actualiza un hotel de la API por su id
const updateHotel = async (id: number, hotel: Hotel): Promise<HotelByID> => {
	return await hotelsApi.put(`/hotels/${id}`, hotel)
}

// Elimina un hotel de la API por su id
const deleteHotelById = async (id: number) => {
	return await hotelsApi.delete(`/hotels/${id}`)
}

export { getHotels, getHotel, deleteHotelById, createHotel, updateHotel }
