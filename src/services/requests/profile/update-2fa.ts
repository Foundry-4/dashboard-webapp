import { api } from '@/services/api'

interface Update2FAProps {
  enabled: boolean
}

export const update2FA = async (params: Update2FAProps) => {
  const response = await api.put('/profile/settings/update-2fa', params)
  return response.data
}
