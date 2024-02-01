import axios from 'axios'

const hotelsApi = axios.create({
	baseURL: 'https://test.devmx.site/api',
})

export default hotelsApi
