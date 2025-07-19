import type { AuthResponse } from '@/domain/interfaces/auth'

import { api } from '@/services/api'

interface Verify2FAProps {
  userGuid: string
  twoFactorCode: string
}

export const verify2FA = async (
  params: Verify2FAProps
): Promise<AuthResponse> => {
  const response = await api.post('/auth/verify-2fa', params)

  return response.data
}
