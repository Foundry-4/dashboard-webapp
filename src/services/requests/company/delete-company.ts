import type { ApiResponse } from '@/domain/interfaces/apiResponse'

import { api } from '@/services/api'

export const deleteCompany = async (
  companyId: number
): Promise<ApiResponse<null>> => {
  const response = await api.delete(`/companies/${companyId}`)
  return response.data
}
