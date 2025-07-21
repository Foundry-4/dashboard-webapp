import { useNavigate } from 'react-router-dom'

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  useSidebar
} from '@/components/ui/sidebar'
import { getSidebarGroups } from '@/config/routes'
import { useIsAdmin } from '@/hooks/isAdmin'
import { SidebarItem } from '@/layouts/DashboardLayout/Sidebar/Item'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const navigate = useNavigate()
  const { open } = useSidebar()
  const isAdmin = useIsAdmin()
  const sidebarGroups = getSidebarGroups(isAdmin)

  return (
    <ShadcnSidebar
      collapsible="icon"
      variant="sidebar"
      className="py-0"
    >
      <SidebarHeader className="py-3">
        <div
          className="flex w-full flex-row items-center gap-2"
          onClick={() => navigate('/')}
        >
          <img
            src="/favicon.png"
            alt="NaMesaJá"
            className="h-7 !w-7"
          />
          <h1 className="pointer-events-none w-full bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text !text-2xl font-bold text-transparent duration-300 ease-in-out group-data-[collapsible=icon]:w-0">
            NaMesaJá
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className={cn('px-1 pt-18', open && 'px-2')}>
        <SidebarMenu>
          {sidebarGroups.map((group, groupIndex) => (
            <SidebarGroup
              key={groupIndex}
              className="px-0"
            >
              {group.label && (
                <SidebarGroupLabel className="px-0">
                  <h2 className="text-xs font-medium">{group.label}</h2>
                </SidebarGroupLabel>
              )}

              <SidebarGroupContent className="flex flex-col gap-2">
                {group.routes.map(route => (
                  <SidebarItem
                    key={route.path}
                    icon={route.icon!}
                    label={route.label!}
                    path={route.path}
                    iconClassName="!h-5 !w-5"
                  />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  )
}
