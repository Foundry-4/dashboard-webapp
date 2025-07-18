import { api } from '@/services/api'

interface CreateProfileParams {
  name: string
}

export const createProfile = async (params: CreateProfileParams) => {
  const response = await api.post('/profile/create-profile', params)
  return response.data
}
