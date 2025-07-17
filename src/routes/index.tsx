import { PageTitle } from '@/components/common/PageTitle'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import { AuthGuard } from '@/middlewares/auth/authGuard'
import ConfirmAccount from '@/pages/auth/confirm-account'
import ForgotPassword from '@/pages/auth/forgot-password'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import ResetPassword from '@/pages/auth/reset-password'
import Verify2FA from '@/pages/auth/verify-2fa'
import ChangePassword from '@/pages/dashboard/change-password'
import Dashboard from '@/pages/dashboard/home'
import NotFound from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PageTitle titleKey="login">
                <Login />
              </PageTitle>
            }
          />
          <Route
            path="/register"
            element={
              <PageTitle titleKey="register">
                <Register />
              </PageTitle>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PageTitle titleKey="forgotPassword">
                <ForgotPassword />
              </PageTitle>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PageTitle titleKey="resetPassword">
                <ResetPassword />
              </PageTitle>
            }
          />
          <Route
            path="/confirm-account"
            element={
              <PageTitle titleKey="confirmAccount">
                <ConfirmAccount />
              </PageTitle>
            }
          />
          <Route
            path="/verify-2fa"
            element={
              <PageTitle titleKey="verify2FA">
                <Verify2FA />
              </PageTitle>
            }
          />
        </Route>
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/"
            element={
              <PageTitle titleKey="dashboard">
                <Dashboard />
              </PageTitle>
            }
          />
          <Route
            path="/change-password"
            element={
              <PageTitle titleKey="changePassword">
                <ChangePassword />
              </PageTitle>
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
