import { useLocation } from 'react-router-dom'

import { getRouteByPath } from '@/config/routes'

export const useCurrentPage = () => {
  const location = useLocation()

  const getPageTitle = (): string => {
    const path = location.pathname
    const route = getRouteByPath(path)

    if (route) {
      return route.title
    }

    // Handle unknown routes by extracting the path segment and capitalizing
    const pathSegments = path.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1]
      // Convert kebab-case or snake_case to Title Case
      return lastSegment
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }

    // Default fallback
    return 'Página'
  }

  return {
    currentPage: getPageTitle(),
    pathname: location.pathname
  }
}
