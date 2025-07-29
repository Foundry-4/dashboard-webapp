import type { ApiResponse } from '@/domain/interfaces/apiResponse'
import type { Company, UpdateCompanyParams } from '@/domain/interfaces/company'

import { api } from '@/services/api'

export const updateCompany = async (
  data: UpdateCompanyParams
): Promise<ApiResponse<Company>> => {
  const response = await api.put(`/companies/${data.companyId}`, data)
  return response.data
}
