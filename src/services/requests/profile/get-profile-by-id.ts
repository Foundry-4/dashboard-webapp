import { api } from '@/services/api'

export const getProfileById = async (userId: string) => {
  const response = await api.get(`/profile/${userId}`)
  return response.data
}
