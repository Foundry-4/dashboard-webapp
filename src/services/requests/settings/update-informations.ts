import { api } from '@/services/api'

interface UpdateInformationsParams {
  name: string
  email: string
}

export const updateInformations = async (params: UpdateInformationsParams) => {
  const response = await api.put('/me/settings/informations', params)
  return response.data
}
