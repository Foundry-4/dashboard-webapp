import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const restoreCompanyFromTrash = async (
  companyIds: number[]
): Promise<ApiResponse<null>> => {
  const response = await api.patch('/companies/restore-from-trash', {
    companyIds
  })
  return response.data
}
