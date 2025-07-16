import { api } from '@/services/api'

type ForgotPasswordRequest = {
  email: string
}

export const forgotPassword = async ({ email }: ForgotPasswordRequest) => {
  const response = await api.post('/auth/forgot-password', { email })
  return response.data
}
