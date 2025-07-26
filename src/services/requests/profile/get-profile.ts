import type { Profile } from '@/domain/interfaces/profile'

import { api } from '@/services/api'

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get('/profile')
  return response.data.data
}
