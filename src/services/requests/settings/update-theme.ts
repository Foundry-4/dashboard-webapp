import { api } from '@/services/api'

interface UpdateThemeParams {
  darkMode: boolean
}

export const updateTheme = async (params: UpdateThemeParams) => {
  const response = await api.put('/me/settings/theme', params)
  return response.data
}
