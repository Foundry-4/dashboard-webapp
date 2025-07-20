import { useLocation } from 'react-router-dom'

import { PAGE_TITLES } from '../config/titles'

export const useCurrentPage = () => {
  const location = useLocation()

  const getPageTitle = (): string => {
    const path = location.pathname

    // Dashboard routes
    if (path === '/') return PAGE_TITLES.dashboard
    if (path === '/profile') return PAGE_TITLES.profile
    if (path === '/profile/change-password') return PAGE_TITLES.changePassword
    if (path === '/users') return PAGE_TITLES.users
    if (path === '/roles') return PAGE_TITLES.roles

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
