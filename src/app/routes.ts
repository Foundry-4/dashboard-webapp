import { type RouteConfig, layout, route } from '@react-router/dev/routes'

export default [
  // Protected routes
  layout('./layouts/DashboardLayout.tsx', [
    route('/', './routes/dashboard/index.tsx')
  ]),

  // Public routes (auth pages)
  layout('./layouts/AuthLayout.tsx', [
    route('/login', './routes/auth/login/index.tsx'),
    route('/register', './routes/auth/register/index.tsx'),
    route('/forgot-password', './routes/auth/forgot-password/index.tsx'),
    route('/reset-password', './routes/auth/reset-password/index.tsx')
  ])
] satisfies RouteConfig
