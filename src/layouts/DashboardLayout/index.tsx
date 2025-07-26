import { Outlet } from 'react-router'

import { WarningModal } from '@/components/common/WarningModal'
import { DashboardLayoutHeader } from '@/layouts/DashboardLayout/Header'
import { Sidebar } from '@/layouts/DashboardLayout/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardLayoutHeader />
        <main className="w-full flex-1 overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>

      <WarningModal />
    </div>
  )
}
