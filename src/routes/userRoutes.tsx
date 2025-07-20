import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Users from '@/pages/dashboard/users'

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RouteTitle titleKey="users">
            <Users />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
