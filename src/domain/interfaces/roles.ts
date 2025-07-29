import type { PaginationParams } from '@/domain/interfaces/apiResponse'

export interface RolesResponse {
  createdAt: string
  deleted: boolean
  name: string
  roleId: number
  updatedAt: string
}

export interface GetRolesParams extends PaginationParams {
  search?: string
  deleted?: boolean
}
