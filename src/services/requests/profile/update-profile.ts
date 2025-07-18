import { api } from '@/services/api'

interface UpdateProfileParams {
  profileId: string
  name: string
}

export const updateProfile = async (params: UpdateProfileParams) => {
  const response = await api.put('/profile/update-profile', params)
  return response.data
}
