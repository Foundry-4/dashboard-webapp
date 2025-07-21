import type { ApiResponse } from '@/domain/interfaces/apiResponse'
import type { RolesResponse } from '@/domain/interfaces/roles'

import { api } from '@/services/api'

export const getRoles = async (): Promise<ApiResponse<RolesResponse[]>> => {
  const response = await api.get('/roles')
  return response.data
}
