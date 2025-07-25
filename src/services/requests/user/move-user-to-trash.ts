import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const moveUserToTrash = async (
  userIds: number[]
): Promise<ApiResponse<void>> => {
  const response = await api.put(`/user/move-to-trash`, {
    userIds
  })
  return response.data
}
