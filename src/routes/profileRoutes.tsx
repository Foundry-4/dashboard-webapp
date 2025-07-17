import { PageTitle } from '@/components/common/PageTitle'
import ChangePassword from '@/pages/dashboard/profile/change-password'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/dashboard/profile'

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={<Profile />}
      />
      <Route
        path="change-password"
        element={
          <PageTitle titleKey="changePassword">
            <ChangePassword />
          </PageTitle>
        }
      />
    </Routes>
  )
}
