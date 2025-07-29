import type { ApiResponse } from '@/domain/interfaces/apiResponse'
import type { Company } from '@/domain/interfaces/company'

import { api } from '@/services/api'

export const getCompanyById = async (
  companyId: string
): Promise<ApiResponse<Company>> => {
  const response = await api.get(`/companies/${companyId}`)
  return response.data
}
