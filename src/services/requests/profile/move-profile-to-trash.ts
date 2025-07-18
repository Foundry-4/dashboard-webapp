import { api } from '@/services/api'

interface MoveProfileToTrashParams {
  profileId: string
}

export const moveProfileToTrash = async (params: MoveProfileToTrashParams) => {
  const response = await api.put('/profile/move-to-trash', params)
  return response.data
}
