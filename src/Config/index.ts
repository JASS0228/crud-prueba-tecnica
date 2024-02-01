import axios from 'axios'

//Este cliente es para no tener que estar escribiendo la url base cada vez que hagamos una petición
const hotelsApi = axios.create({
	baseURL: 'https://test.devmx.site/api',
})

export default hotelsApi
