import { api } from '@/services/api'

interface RestoreProfileFromTrashParams {
  profileId: string
}

export const restoreProfileFromTrash = async (
  params: RestoreProfileFromTrashParams
) => {
  const response = await api.put('/profile/restore-profile-from-trash', params)
  return response.data
}
