import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Roles from '@/pages/dashboard/roles'

export default function RolesRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RouteTitle titleKey="roles">
            <Roles />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
