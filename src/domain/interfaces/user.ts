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
