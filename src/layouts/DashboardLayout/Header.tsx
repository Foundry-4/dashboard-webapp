import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'

import { SettingsDropdown } from '@/components/common/SettingsDropdown'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCurrentPage } from '@/hooks/useCurrentPage'
import { UserQueries } from '@/services/queries/user'

export const DashboardLayoutHeader = () => {
  const { currentPage } = useCurrentPage()
  const user = UserQueries.useGetUserById(currentPage, !!Number(currentPage))

  const isLoading = user.isLoading

  const titleHeader = useMemo(() => {
    if (user.data?.data?.name) {
      return `Editar usuário ${user.data.data.name}`
    }

    return currentPage
  }, [currentPage, user.data?.data?.name])

  return (
    <header className="flex h-16 items-center justify-between border-b bg-transparent px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="z-10" />
        <h2 className="text-foreground text-lg font-semibold">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            titleHeader
          )}
        </h2>
      </div>

      <SettingsDropdown />
    </header>
  )
}
