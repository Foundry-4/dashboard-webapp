import { api } from '@/services/api'

export const deleteAvatar = async () => {
  const response = await api.delete('/profile/settings/delete-photo')
  return response
}
