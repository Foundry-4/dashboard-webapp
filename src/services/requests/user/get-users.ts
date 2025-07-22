import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { User } from '@/domain/interfaces/user'

import { api } from '@/services/api'

export const getUsers = async (): Promise<
  ApiResponseWithPagination<User[]>
> => {
  const response = await api.get('/users')
  return response.data
}
