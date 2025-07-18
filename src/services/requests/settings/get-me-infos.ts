import { api } from '@/services/api'

export const getMeProfile = async () => {
  const response = await api.get('/me/profile')
  return response.data.data
}
