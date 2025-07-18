import type { ReactNode } from 'react'

import type { PageTitleKey } from '@/config/titles'
import { PAGE_TITLES } from '@/config/titles'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface PageTitleProps {
  titleKey: PageTitleKey
  children: ReactNode
}

export const PageTitle = ({ titleKey, children }: PageTitleProps) => {
  const title = PAGE_TITLES[titleKey]
  useDocumentTitle(title)

  return <>{children}</>
}
