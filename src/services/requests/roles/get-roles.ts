import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { GetRolesParams, RolesResponse } from '@/domain/interfaces/roles'

import { api } from '@/services/api'

export const getRoles = async (
  params?: GetRolesParams
): Promise<ApiResponseWithPagination<RolesResponse[]>> => {
  const response = await api.get('/roles', { params })
  return response.data
}
