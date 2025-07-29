import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const moveCompanyToTrash = async (
  companyIds: number[]
): Promise<ApiResponse<null>> => {
  const response = await api.patch('/companies/move-to-trash', {
    companyIds
  })
  return response.data
}
