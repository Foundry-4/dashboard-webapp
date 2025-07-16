import { api } from '@/services/api'

type CreateUserRequest = {
  name: string
  email: string
  confirmEmail: string
  password: string
}

export const createUser = async (data: CreateUserRequest) => {
  const response = await api.post('/auth/create-user', data)
  return response.data
}
