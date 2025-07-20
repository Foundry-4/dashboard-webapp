import type { ReactNode } from 'react'

import { ROUTES } from '@/config/routes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface RouteTitleProps {
  titleKey: keyof typeof ROUTES
  children: ReactNode
}

export const RouteTitle = ({ titleKey, children }: RouteTitleProps) => {
  const title = ROUTES[titleKey].routeTitle
  useDocumentTitle(title)

  return <>{children}</>
}
