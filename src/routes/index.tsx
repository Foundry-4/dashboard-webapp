import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { RouteTitle } from '@/components/common/RouteTitle'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import { AuthGuard } from '@/middlewares/auth/authGuard'
import ConfirmAccount from '@/pages/auth/confirm-account'
import ForgotPassword from '@/pages/auth/forgot-password'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import ResetPassword from '@/pages/auth/reset-password'
import Verify2FA from '@/pages/auth/verify-2fa'
import Dashboard from '@/pages/dashboard'
import NotFound from '@/pages/NotFound'

const ProfileRoutes = lazy(() => import('./profileRoutes'))
const UserRoutes = lazy(() => import('./userRoutes'))
const RolesRoutes = lazy(() => import('./rolesRoutes'))

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <RouteTitle titleKey="login">
                <Login />
              </RouteTitle>
            }
          />
          <Route
            path="/register"
            element={
              <RouteTitle titleKey="register">
                <Register />
              </RouteTitle>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RouteTitle titleKey="forgotPassword">
                <ForgotPassword />
              </RouteTitle>
            }
          />
          <Route
            path="/reset-password"
            element={
              <RouteTitle titleKey="resetPassword">
                <ResetPassword />
              </RouteTitle>
            }
          />
          <Route
            path="/confirm-account"
            element={
              <RouteTitle titleKey="confirmAccount">
                <ConfirmAccount />
              </RouteTitle>
            }
          />
          <Route
            path="/verify-2fa"
            element={
              <RouteTitle titleKey="verify2FA">
                <Verify2FA />
              </RouteTitle>
            }
          />
        </Route>
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/"
            element={
              <RouteTitle titleKey="dashboard">
                <Dashboard />
              </RouteTitle>
            }
          />
          <Route
            path="/profile/*"
            element={
              <Suspense fallback={<LoadingSpinner disableFullScreen />}>
                <ProfileRoutes />
              </Suspense>
            }
          />
          <Route
            path="/users/*"
            element={
              <Suspense fallback={<LoadingSpinner disableFullScreen />}>
                <UserRoutes />
              </Suspense>
            }
          />
          <Route
            path="/roles/*"
            element={
              <Suspense fallback={<LoadingSpinner disableFullScreen />}>
                <RolesRoutes />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}
