export interface Profile {
  userId: number
  createdAt: string
  updatedAt: string
  name: string
  email: string
  roleId: number
  roleName: string
  accountConfirmed: string
  blocked: boolean
  blockDate: string | null
  lastPasswordChange: string
  lastAccess: string
  totalAccesses: number
  twoFactorEnabled: boolean
  darkTheme: boolean
  deleted: boolean
  profilePictureUrl: string
}
