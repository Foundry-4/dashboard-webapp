import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.namesaja.com.br'
})

// Request interceptor to add Bearer token
api.interceptors.request.use(
  config => {
    // Get token from localStorage
    const user = localStorage.getItem('na-mesa-ja:user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // If we get a 401 (Unauthorized) response, the token might be expired
    if (error.response?.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem('na-mesa-ja:user')

      // Redirect to login page if we're not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
