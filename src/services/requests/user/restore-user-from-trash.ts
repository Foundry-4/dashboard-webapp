import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const restoreUserFromTrash = async (
  userIds: number[]
): Promise<ApiResponse<void>> => {
  const response = await api.put(`/user/restore-from-trash`, {
    userIds
  })
  return response.data
}
