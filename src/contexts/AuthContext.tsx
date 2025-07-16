import { AuthMutations } from '@/services/queries/auth'
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'
import type {
  AuthResponse,
  ChangePasswordProps,
  ForgotPasswordProps,
  LoginProps,
  RegisterProps,
  ResetPasswordProps,
  Verify2FAProps
} from '../domain/interfaces/auth'

interface User {
  userId: string
  name: string
  email: string
  userGuid: string
  token?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  setUser: Dispatch<SetStateAction<User | null>>
  login: (props: LoginProps) => Promise<AuthResponse>
  logout: () => void
  register: (props: RegisterProps) => Promise<AuthResponse>
  forgotPassword: (props: ForgotPasswordProps) => Promise<AuthResponse>
  resetPassword: (props: ResetPasswordProps) => Promise<AuthResponse>
  verify2FA: (props: Verify2FAProps) => Promise<AuthResponse>
  changePassword: (props: ChangePasswordProps) => Promise<AuthResponse>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('na-mesa-ja:user')
    return user ? JSON.parse(user) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('na-mesa-ja:accessToken')
  })

  const createUser = AuthMutations.useCreateUser()
  const loginUser = AuthMutations.useLogin()
  const forgotPasswordMutation = AuthMutations.useForgotPassword()
  const verify2FAMutation = AuthMutations.useVerify2FA()
  const resetPasswordMutation = AuthMutations.useResetPassword()
  const changePasswordMutation = AuthMutations.useChangePassword()

  const login = async ({ email, password }: LoginProps) => {
    const response = await loginUser.mutateAsync({ email, password })

    if (!response.status) {
      return response
    }

    setUser(response.data)
    localStorage.setItem('na-mesa-ja:user', JSON.stringify(response.data))

    return response
  }

  const logout = () => {
    localStorage.removeItem('na-mesa-ja:accessToken')
    localStorage.removeItem('na-mesa-ja:user')
    setIsAuthenticated(false)
    setUser(null)
  }

  const register = async ({
    name,
    email,
    confirmEmail,
    password
  }: RegisterProps) => {
    return await createUser.mutateAsync({ name, email, confirmEmail, password })
  }

  const verify2FA = async ({ twoFactorCode }: Verify2FAProps) => {
    const response = await verify2FAMutation.mutateAsync({
      userGuid: user?.userGuid ?? '',
      twoFactorCode
    })

    if (!response.status) {
      return response
    }

    const userData = {
      ...user,
      ...response.data
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('na-mesa-ja:accessToken', response.data?.token ?? '')
    localStorage.setItem('na-mesa-ja:user', JSON.stringify(userData))

    return response
  }

  const forgotPassword = async ({ email }: ForgotPasswordProps) => {
    return await forgotPasswordMutation.mutateAsync({ email })
  }

  const resetPassword = async ({
    userGuid,
    newPassword,
    confirmPassword
  }: ResetPasswordProps) => {
    return await resetPasswordMutation.mutateAsync({
      userGuid,
      newPassword,
      confirmPassword
    })
  }

  const changePassword = async ({
    userGuid,
    currentPassword,
    newPassword,
    confirmPassword
  }: ChangePasswordProps) => {
    return await changePasswordMutation.mutateAsync({
      userGuid,
      currentPassword,
      newPassword,
      confirmPassword
    })
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verify2FA,
    changePassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
