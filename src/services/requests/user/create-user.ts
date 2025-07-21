import { api } from '@/services/api'

interface CreateUserParams {
  name: string
  email: string
  confirmEmail: string
  password: string
  roleId: number
}

export const createUser = async (params: CreateUserParams) => {
  const response = await api.post('/user/create-user', params)
  return response.data
}
