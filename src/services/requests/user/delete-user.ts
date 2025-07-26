import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const deleteUser = async (
  userIds: number[]
): Promise<ApiResponse<void>> => {
  const response = await api.delete(`/user/delete`, {
    data: {
      userIds
    }
  })
  return response.data
}
