export interface User {
  userId: string
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
