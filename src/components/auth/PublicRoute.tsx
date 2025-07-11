import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router'

interface PublicRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const PublicRoute = ({ children, fallback }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  console.log({ isAuthenticated, isLoading })

  if (isLoading) {
    return (
      fallback || (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
            <p className="text-sm text-gray-600">Carregando...</p>
          </div>
        </div>
      )
    )
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return <>{children}</>
}
