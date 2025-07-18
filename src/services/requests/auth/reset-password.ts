import type { AuthResponse } from '@/domain/interfaces/auth'
import { api } from '@/services/api'

export interface ResetPasswordRequest {
  userGuid: string
  newPassword: string
  confirmPassword: string
}

export const resetPassword = async (
  params: ResetPasswordRequest
): Promise<AuthResponse> => {
  const response = await api.post('/auth/reset-password', params)

  return response.data
}
