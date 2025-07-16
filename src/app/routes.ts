import { type RouteConfig, layout, route } from '@react-router/dev/routes'

export default [
  layout('./layouts/DashboardLayout.tsx', [
    route('/', './routes/dashboard/index.tsx'),
    route('/change-password', './routes/auth/change-password/index.tsx')
  ]),

  layout('./layouts/AuthLayout.tsx', [
    route('/login', './routes/auth/login/index.tsx'),
    route('/register', './routes/auth/register/index.tsx'),
    route('/forgot-password', './routes/auth/forgot-password/index.tsx'),
    route('/reset-password', './routes/auth/reset-password/index.tsx'),
    route('/confirm-account', './routes/auth/confirm-account/index.tsx'),
    route('/verify-2fa', './routes/auth/verify-2fa/index.tsx')
  ])
] satisfies RouteConfig
