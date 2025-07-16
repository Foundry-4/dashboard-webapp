import { useAuth } from '@/contexts/AuthContext'
import { Navigate, useLocation } from 'react-router'

interface PrivateRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const PrivateRoute = ({ children, fallback }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      fallback || (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
            <p className="text-sm text-gray-600">Carregando privada...</p>
          </div>
        </div>
      )
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <>{children}</>
}
