import { api } from '@/services/api'

interface UpdatePasswordParams {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const updatePassword = async (params: UpdatePasswordParams) => {
  const response = await api.put('/me/settings/password', params)
  return response.data
}
