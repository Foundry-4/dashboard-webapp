import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { GetUsersParams, User } from '@/domain/interfaces/user'

import { api } from '@/services/api'
import { buildQueryString } from '@/utils/query'

export const getUsers = async (
  params?: GetUsersParams
): Promise<ApiResponseWithPagination<User[]>> => {
  const queryString = params ? buildQueryString<GetUsersParams>(params) : ''

  const response = await api.get(
    `/users${queryString ? `?${queryString}` : ''}`
  )
  return response.data
}
