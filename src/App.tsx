import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

import { AuthProvider } from './contexts/AuthContext'

import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Toaster } from '@/components/ui/sonner'
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
          <Toaster />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
