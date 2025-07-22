import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const moveUserToTrash = async (
  userId: number
): Promise<ApiResponse<void>> => {
  const response = await api.put(`/user/move-to-trash`, {
    userId
  })
  return response.data
}
