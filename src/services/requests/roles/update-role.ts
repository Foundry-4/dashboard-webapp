import { api } from '@/services/api'

interface UpdateRoleParams {
  roleId: string
  name: string
}

export const updateRole = async (params: UpdateRoleParams) => {
  const response = await api.put('/role/update-role', params)
  return response.data
}
