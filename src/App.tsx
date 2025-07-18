import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppRoutes } from '@/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
              <Toaster />
            </Suspense>
          </SidebarProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
