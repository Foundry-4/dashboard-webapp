import type { PageTitleKey } from '@/config/titles'
import { PAGE_TITLES } from '@/config/titles'

export const getPageTitle = (titleKey: PageTitleKey): string => {
  return PAGE_TITLES[titleKey]
}

export const getDynamicTitle = (
  baseTitle: string,
  dynamicData?: Record<string, string | number>
): string => {
  if (!dynamicData) return baseTitle

  let title = baseTitle

  // Replace placeholders in the title with dynamic data
  Object.entries(dynamicData).forEach(([key, value]) => {
    const placeholder = `{${key}}`
    title = title.replace(placeholder, String(value))
  })

  return title
}

export const formatUserTitle = (title: string, userName?: string): string => {
  if (!userName) return title
  return title.replace('{userName}', userName)
}
