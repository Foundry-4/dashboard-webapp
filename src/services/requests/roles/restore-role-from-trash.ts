import { api } from '@/services/api'

interface RestoreRoleFromTrashParams {
  roleId: string
}

export const restoreRoleFromTrash = async (
  params: RestoreRoleFromTrashParams
) => {
  const response = await api.put('/role/restore-from-trash', params)
  return response.data
}
