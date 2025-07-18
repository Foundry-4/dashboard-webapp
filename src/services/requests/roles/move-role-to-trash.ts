import { api } from '@/services/api'

interface MoveRoleToTrashParams {
  roleId: string
}

export const moveRoleToTrash = async (params: MoveRoleToTrashParams) => {
  const response = await api.put('/role/move-to-trash', params)
  return response.data
}
