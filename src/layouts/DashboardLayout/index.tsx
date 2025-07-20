import { Outlet } from 'react-router'

import { DashboardLayoutHeader } from '@/layouts/DashboardLayout/Header'
import { Sidebar } from '@/layouts/DashboardLayout/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />

      <div className="flex w-full flex-1 flex-col">
        <DashboardLayoutHeader />
        <main className="w-full flex-1 overflow-auto px-6 py-0 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
