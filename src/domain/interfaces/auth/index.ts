export interface AuthResponse {
  data: {
    userId: string
    userGuid: string
    name: string
    email: string
    token?: string
  }
  message: string
  status: boolean
}
