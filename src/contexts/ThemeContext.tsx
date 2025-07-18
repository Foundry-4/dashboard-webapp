import { createContext, useContext, useEffect } from 'react'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ProfileMutations, ProfileQueries } from '@/services/queries/profile'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const profile = ProfileQueries.useGetProfile()
  const updateTheme = ProfileMutations.useUpdateTheme()
  const theme: Theme = profile.data?.darkTheme ? 'dark' : 'light'

  const handleSetTheme = (theme: Theme) => {
    updateTheme.mutate({ darkTheme: theme === 'dark' })
  }

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: handleSetTheme
  }

  if (profile.isLoading) return <LoadingSpinner />

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
