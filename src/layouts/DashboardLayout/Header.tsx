import { SettingsDropdown } from '@/components/common/SettingsDropdown'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCurrentPage } from '@/hooks/useCurrentPage'

export const DashboardLayoutHeader = () => {
  const { currentPage } = useCurrentPage()

  return (
    <header className="flex h-16 items-center justify-between bg-transparent px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="z-10" />
        <h2 className="text-foreground text-lg font-semibold">{currentPage}</h2>
      </div>

      <SettingsDropdown />
    </header>
  )
}
