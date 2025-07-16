import type { AuthResponse } from '@/domain/interfaces/auth'
import { api } from '@/services/api'

type ConfirmAccountRequest = {
  userGuid: string
}

export const confirmAccount = async ({
  userGuid
}: ConfirmAccountRequest): Promise<AuthResponse> => {
  const response = await api.get(`/auth/confirm-account`, {
    params: {
      userGuid
    }
  })
  return response.data
}
