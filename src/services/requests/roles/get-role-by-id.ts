import { api } from '@/services/api'

export const getRoleById = async (roleId: string) => {
  const response = await api.get(`/role/${roleId}`)
  return response.data
}
