import { useAuth } from '@/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router'

interface AuthGuardProps {
  isPrivate: boolean
}

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
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

  return <Outlet />
}
