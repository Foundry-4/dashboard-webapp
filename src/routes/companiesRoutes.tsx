import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Companies from '@/pages/dashboard/companies'

export default function CompaniesRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RouteTitle titleKey="companies">
            <Companies />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
