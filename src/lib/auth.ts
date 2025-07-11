// Authentication utilities

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token')
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token)
}

export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token')
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

// API request helper with authentication
export const authenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken()

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` })
  }

  return fetch(url, {
    ...options,
    headers
  })
}

// Handle API errors
export const handleApiError = async (response: Response): Promise<never> => {
  if (response.status === 401) {
    // Unauthorized - clear auth and redirect to login
    removeAuthToken()
    localStorage.removeItem('user')
    window.location.href = '/login'
    throw new Error('Sessão expirada. Faça login novamente.')
  }

  const errorData = await response.json().catch(() => ({}))
  throw new Error(
    errorData.message || `Erro ${response.status}: ${response.statusText}`
  )
}
