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

export interface RegisterProps {
  name: string
  email: string
  confirmEmail: string
  password: string
}

export interface LoginProps {
  email: string
  password: string
}

export interface ForgotPasswordProps {
  email: string
}

export interface ResetPasswordProps {
  userGuid: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordProps {
  userGuid: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface Verify2FAProps {
  twoFactorCode: string
}
