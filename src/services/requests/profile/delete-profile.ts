import { api } from '@/services/api'

interface DeleteProfileParams {
  profileId: string
}

export const deleteProfile = async (params: DeleteProfileParams) => {
  const response = await api.delete('/profile/delete', {
    data: params
  })
  return response.data
}
