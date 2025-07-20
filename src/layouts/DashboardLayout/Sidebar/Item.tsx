import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { LucideIcon } from 'lucide-react'

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  path?: string
  iconClassName?: string
}

export const SidebarItem = ({
  icon: Icon,
  label,
  path,
  iconClassName
}: SidebarItemProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = useMemo(() => {
    return location.pathname === path
  }, [location.pathname, path])

  const handleNavigate = useCallback(() => {
    if (path) {
      navigate(path)
    }
  }, [path, navigate])

  return (
    <SidebarMenuItem
      className={cn(
        'rounded-xs bg-transparent duration-300 ease-in-out hover:bg-orange-400',
        isActive && 'bg-orange-300'
      )}
    >
      <SidebarMenuButton
        className="rounded-xs px-4 py-5 duration-300 ease-in-out hover:bg-orange-400"
        onClick={handleNavigate}
      >
        <Icon className={iconClassName} />
        <h2 className={cn('text-xs font-medium', isActive && 'font-bold')}>
          {label}
        </h2>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
