import { api } from '@/services/api'

interface UpdateThemeParams {
  darkMode: boolean
}

export const updateTheme = async (params: UpdateThemeParams) => {
  const response = await api.put('/profile/settings/update-theme', params)
  return response.data
}
