import { api } from '@/services/api'

export const getProfile = async () => {
  const response = await api.get('/profile')
  return response.data.data
}
