import { SettingsDropdown } from '@/components/common/SettingsDropdown'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const DashboardLayoutHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="z-10" />
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>

      <SettingsDropdown />
    </header>
  )
}
