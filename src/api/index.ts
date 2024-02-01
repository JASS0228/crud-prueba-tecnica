import hotelsApi from '../Config'

const getHotels = async () => {
	return await hotelsApi.get('/hotels')
}

export { getHotels }
