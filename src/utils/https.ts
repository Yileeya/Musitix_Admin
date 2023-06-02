import axios from 'axios'

const https = axios.create({
  baseURL: 'https://musitix-api.onrender.com/admin'
})

https.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token')
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
