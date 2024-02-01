import hotelsApi from '../Config'

// Obtiene todo los hoteles de la APi
const getHotels = async () => {
	return await hotelsApi.get('/hotels')
}

export { getHotels }
