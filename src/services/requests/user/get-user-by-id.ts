import { api } from '@/services/api'

export const getUserById = async (userId: string) => {
  const response = await api.get(`/user/${userId}`)
  return response.data
}
