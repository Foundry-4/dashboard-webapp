import { api } from '@/services/api'

interface DeleteRoleParams {
  roleId: string
}

export const deleteRole = async (params: DeleteRoleParams) => {
  const response = await api.delete('/role/delete', {
    data: params
  })
  return response.data
}
