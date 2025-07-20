import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Profile from '@/pages/dashboard/profile'
import ChangePassword from '@/pages/dashboard/profile/change-password'

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RouteTitle titleKey="profile">
            <Profile />
          </RouteTitle>
        }
      />
      <Route
        path="change-password"
        element={
          <RouteTitle titleKey="changePassword">
            <ChangePassword />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
