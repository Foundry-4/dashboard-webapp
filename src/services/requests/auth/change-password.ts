import type { AuthResponse } from '@/domain/interfaces/auth'
import { api } from '@/services/api'

export interface ChangePasswordRequest {
  userGuid: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const changePassword = async (
  params: ChangePasswordRequest
): Promise<AuthResponse> => {
  const response = await api.post('/auth/change-password', params)

  return response.data
}
