import type { PaginationParams } from './apiResponse'

export interface User {
  userId: number
  name: string
  email: string
  roleName: string
  createdAt: string
  updatedAt: string
  accountConfirmed: 'S' | 'N'
  blocked: boolean
  twoFactorEnabled: boolean
  deleted: boolean
}

export interface GetUsersParams extends PaginationParams {
  search?: string
  deleted?: boolean
}
