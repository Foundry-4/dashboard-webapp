import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { RolesResponse } from '@/domain/interfaces/roles'

import { api } from '@/services/api'

export const getRoles = async (): Promise<
  ApiResponseWithPagination<RolesResponse[]>
> => {
  const response = await api.get('/roles')
  return response.data
}
