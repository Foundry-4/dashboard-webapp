import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Companies from '@/pages/dashboard/companies'
import CreateCompany from '@/pages/dashboard/companies/create-company'

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
      <Route
        path="create-company"
        element={
          <RouteTitle titleKey="createCompany">
            <CreateCompany />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
