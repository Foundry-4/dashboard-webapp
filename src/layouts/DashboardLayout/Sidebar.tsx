import {
  Sidebar as ShadcnSidebar,
  SidebarHeader
} from '@/components/ui/sidebar'

export function Sidebar() {
  return (
    <ShadcnSidebar
      collapsible="icon"
      variant="sidebar"
      className="py-3"
    >
      <SidebarHeader className="py-0">
        <div className="flex w-full flex-row items-center gap-2">
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
    </ShadcnSidebar>
  )
}
