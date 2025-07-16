import { type AuthResponse } from '@/domain/interfaces/auth'
import { api } from '@/services/api'

type LoginRequest = {
  email: string
  password: string
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}
