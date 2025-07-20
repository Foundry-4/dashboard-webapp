import type { RouteTitleKeys } from '@/config/titles'
import type { ReactNode } from 'react'

import { ROUTE_TITLES } from '@/config/titles'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface RouteTitleProps {
  titleKey: RouteTitleKeys
  children: ReactNode
}

export const RouteTitle = ({ titleKey, children }: RouteTitleProps) => {
  const title = ROUTE_TITLES[titleKey]
  useDocumentTitle(title)

  return <>{children}</>
}
