import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Services from '@/pages/dashboard/services'

export default function ServicesRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <RouteTitle titleKey="services">
            <Services />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
