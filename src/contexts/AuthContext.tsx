import { AuthMutations } from '@/services/queries/auth'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'
import type { AuthResponse } from '../domain/interfaces/auth'

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
  isLoading: boolean
  setUser: Dispatch<SetStateAction<User | null>>
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => void
  register: (
    name: string,
    email: string,
    confirmEmail: string,
    password: string
  ) => Promise<AuthResponse>
  forgotPassword: (email: string) => Promise<AuthResponse>
  resetPassword: (
    userGuid: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<AuthResponse>
  verify2FA: (otp: string) => Promise<AuthResponse>
  changePassword: (
    userGuid: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<AuthResponse>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user?.token

  const createUser = AuthMutations.useCreateUser()
  const loginUser = AuthMutations.useLogin()
  const forgotPasswordMutation = AuthMutations.useForgotPassword()
  const verify2FAMutation = AuthMutations.useVerify2FA()
  const resetPasswordMutation = AuthMutations.useResetPassword()
  const changePasswordMutation = AuthMutations.useChangePassword()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await loginUser.mutateAsync({ email, password })

    if (!response.status) {
      return response
    }

    setUser(response.data)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = async (
    name: string,
    email: string,
    confirmEmail: string,
    password: string
  ) => {
    const response = await createUser.mutateAsync({
      name,
      email,
      confirmEmail,
      password
    })

    return response
  }

  const verify2FA = async (otp: string) => {
    const response = await verify2FAMutation.mutateAsync({
      userGuid: user?.userGuid ?? '',
      twoFactorCode: otp
    })

    if (!response.status) {
      return response
    }

    const userData = {
      ...user,
      ...response.data
    }

    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return response
  }

  const forgotPassword = async (email: string) => {
    const response = await forgotPasswordMutation.mutateAsync({ email })
    return response
  }

  const resetPassword = async (
    userGuid: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      const response = await resetPasswordMutation.mutateAsync({
        userGuid,
        newPassword,
        confirmPassword
      })

      return response
    } catch (error) {
      console.error('Reset password failed:', error)
      throw new Error('Falha ao redefinir senha.')
    }
  }

  const changePassword = async (
    userGuid: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    const response = await changePasswordMutation.mutateAsync({
      userGuid,
      currentPassword,
      newPassword,
      confirmPassword
    })

    return response
  }

  const isLoading = false

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
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
