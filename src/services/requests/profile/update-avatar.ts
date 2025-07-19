import { api } from '@/services/api'

interface UpdateAvatarProps {
  picture: File
}

export const updateAvatar = async (params: UpdateAvatarProps) => {
  const response = await api.post('/profile/settings/update-photo', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
