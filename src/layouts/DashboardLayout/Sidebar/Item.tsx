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
    if (!path) return false

    if (path === '/') {
      return location.pathname === '/'
    }

    const startWithPath = location.pathname.startsWith(path)
    const samePath = location.pathname === path
    const isPathEndingWithSlash = location.pathname.charAt(path.length) === '/'

    return startWithPath && (samePath || isPathEndingWithSlash)
  }, [location.pathname, path])

  const handleNavigate = useCallback(() => {
    if (path) {
      navigate(path)
    }
  }, [path, navigate])

  return (
    <SidebarMenuItem
      className={cn(
        'rounded-xs duration-300 ease-in-out hover:bg-gray-300',
        isActive && 'bg-gray-300'
      )}
      onClick={handleNavigate}
    >
      <SidebarMenuButton
        className={cn(
          'rounded-xs px-4 py-5 duration-300 ease-in-out',
          isActive && 'bg-gray-300'
        )}
      >
        <Icon className={iconClassName} />
        <h2 className={cn('text-xs font-medium', isActive && 'font-bold')}>
          {label}
        </h2>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
