import { useQueryClient } from '@tanstack/react-query'
import {
  useEffect,
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
} from '@/domain/interfaces/auth'

import { AuthContext } from '@/hooks/useAuth'
import { api } from '@/services/api'
import { AuthMutations } from '@/services/queries/auth'

interface User {
  userId: string
  name: string
  email: string
  userGuid: string
  token?: string
}

export interface AuthContextType {
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

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('foundry4-admin:user')
    return user ? JSON.parse(user) : null
  })
  const isAuthenticated = !!user?.token

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
    localStorage.setItem('foundry4-admin:user', JSON.stringify(response.data))

    return response
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('foundry4-admin:user')
    // Clear the authorization header from axios
    delete api.defaults.headers.common['Authorization']
    // Invalidate all queries to clear cached data
    queryClient.invalidateQueries()
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
    localStorage.setItem('foundry4-admin:user', JSON.stringify(userData))

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

  // Listen for localStorage changes from other tabs/windows
  // This automatically syncs the user state when localStorage is modified externally
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'foundry4-admin:user') {
        if (event.newValue === null) {
          setUser(null)
        } else if (event.newValue) {
          try {
            const userData = JSON.parse(event.newValue)
            setUser(userData)
          } catch (error) {
            console.error('Failed to parse user data from localStorage:', error)
            setUser(null)
          }
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

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
