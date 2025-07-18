import { api } from '@/services/api'

interface CreateRoleParams {
  name: string
}

export const createRole = async (params: CreateRoleParams) => {
  const response = await api.post('/role/create-role', params)
  return response.data
}
