import hotelsApi from '../Config'
import { Hotel, HotelByID, Hotels } from '../types/hotelType'

// Obtiene todo los hoteles de la APi
const getHotels = async () => {
	return await hotelsApi.get('/hotels')
}

const getHotel = async (id: number) => {
	return await hotelsApi.get<HotelByID>(`/hotels/${id}`)
}

export { getHotels, getHotel }
