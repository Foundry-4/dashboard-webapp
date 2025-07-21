import type { ApiResponse } from '@/domain/interfaces/apiResponse'
import type { RolesResponse } from '@/domain/interfaces/roles'

import { api } from '@/services/api'

export const getRoleById = async (
  roleId: string
): Promise<ApiResponse<RolesResponse>> => {
  const response = await api.get(`/role/${roleId}`)
  return response.data
}
