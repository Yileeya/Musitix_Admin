import axios from 'axios'

const https = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

https.interceptors.request.use((config) => {
  const token = ''
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

https.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default https
