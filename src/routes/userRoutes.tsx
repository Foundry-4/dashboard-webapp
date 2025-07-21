import { Route, Routes } from 'react-router-dom'

import { RouteTitle } from '@/components/common/RouteTitle'
import Users from '@/pages/dashboard/users'
import CreateUser from '@/pages/dashboard/users/create-user'
import EditUser from '@/pages/dashboard/users/edit-user'

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
      <Route
        path="create-user"
        element={
          <RouteTitle titleKey="createUser">
            <CreateUser />
          </RouteTitle>
        }
      />
      <Route
        path="edit-user/:userId"
        element={
          <RouteTitle titleKey="editUser">
            <EditUser />
          </RouteTitle>
        }
      />
    </Routes>
  )
}
