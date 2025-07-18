import { api } from '@/services/api'

export const getProfiles = async () => {
  const response = await api.get('/profiles')
  return response.data
}
