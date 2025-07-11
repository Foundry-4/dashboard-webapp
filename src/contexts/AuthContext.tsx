import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          // TODO: Validate token with API
          // For now, we'll simulate a user session
          const storedUser = localStorage.getItem('user')
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'Usuário Teste',
        role: 'user'
      }

      const mockToken = 'mock-jwt-token'

      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Falha na autenticação. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', { name, email, password })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'user'
      }

      const mockToken = 'mock-jwt-token'

      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error('Registration failed:', error)
      throw new Error('Falha no cadastro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // await api.post('/auth/forgot-password', { email })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Forgot password failed:', error)
      throw new Error('Falha ao enviar email de recuperação.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // await api.post('/auth/reset-password', { token, password })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Reset password failed:', error)
      throw new Error('Falha ao redefinir senha.')
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
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
