import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router'

interface AuthGuardProps {
  children: React.ReactNode
  isPrivate: boolean
}

export const AuthGuard = ({ children, isPrivate }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated && !isPrivate) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  if (!isAuthenticated && isPrivate) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return <>{children}</>
}
