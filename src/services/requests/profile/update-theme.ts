import { api } from '@/services/api'

interface UpdateThemeParams {
  darkTheme: boolean
}

export const updateTheme = async (params: UpdateThemeParams) => {
  const response = await api.put('/profile/settings/update-theme', params)
  return response.data
}
