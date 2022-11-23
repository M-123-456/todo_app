import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1'

const axiosClient = axios.create({
    baseURL: BASE_URL
})

// Add a request interceptor
axiosClient.interceptors.request.use(async(config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json'
        }
    }
})

// Add a response interceptor
axiosClient.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    throw err.response
}) 

export default axiosClient