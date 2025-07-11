# Authentication System

This document describes the authentication system implemented in the NaMesaJá dashboard webapp.

## Overview

The authentication system provides:

- Protected routes for authenticated users
- Public routes for unauthenticated users
- Login, register, forgot password, and reset password functionality
- Automatic session management
- Loading states and error handling

## Architecture

### Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state
   - Provides login, logout, register functions
   - Handles session persistence

2. **ProtectedRoute** (`src/components/auth/ProtectedRoute.tsx`)
   - Wraps routes that require authentication
   - Redirects unauthenticated users to login
   - Shows loading state during auth check

3. **PublicRoute** (`src/components/auth/PublicRoute.tsx`)
   - Wraps routes that should only be accessible to unauthenticated users
   - Redirects authenticated users to dashboard

4. **DashboardLayout** (`src/app/layouts/DashboardLayout.tsx`)
   - Layout for authenticated pages
   - Includes sidebar navigation and user menu
   - Handles logout functionality

5. **AuthLayout** (`src/app/layouts/AuthLayout.tsx`)
   - Layout for authentication pages
   - Includes the login screen background

### Routes

#### Protected Routes

- `/` - Dashboard (requires authentication)

#### Public Routes

- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Forgot password page
- `/reset-password` - Reset password page (requires token)

## Usage

### Authentication State

```typescript
import { useAuth } from '@/contexts/AuthContext'

const { user, isAuthenticated, isLoading, login, logout } = useAuth()
```

### Protected Routes

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

### Public Routes

```typescript
import { PublicRoute } from '@/components/auth/PublicRoute'

<PublicRoute>
  <YourPublicComponent />
</PublicRoute>
```

## API Integration

The authentication system is designed to work with a REST API. To integrate with your backend:

1. Update the API calls in `AuthContext.tsx`
2. Replace the mock implementations with real API calls
3. Use the `authenticatedRequest` utility for API calls that require authentication

### Example API Integration

```typescript
// In AuthContext.tsx
const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    setAuthToken(data.token)
    setUser(data.user)
  } catch (error) {
    throw error
  }
}
```

## Security Features

- Automatic token validation on app load
- Automatic logout on 401 responses
- Secure token storage in localStorage
- Redirect to original page after login
- Form validation and error handling

## Customization

### Styling

- Loading states use Tailwind CSS classes
- Error messages use consistent styling
- All components follow the design system

### Behavior

- Session persistence across browser sessions
- Automatic redirects based on authentication state
- Loading states during authentication checks

## Testing

To test the authentication system:

1. **Login Flow**
   - Navigate to `/login`
   - Enter credentials (any email/password works in mock mode)
   - Should redirect to dashboard

2. **Registration Flow**
   - Navigate to `/register`
   - Fill out the form
   - Should create account and redirect to dashboard

3. **Protected Routes**
   - Try accessing `/` without authentication
   - Should redirect to login

4. **Public Routes**
   - Try accessing `/login` while authenticated
   - Should redirect to dashboard

5. **Logout**
   - Click logout in dashboard
   - Should clear session and redirect to login

## Future Enhancements

- Refresh token implementation
- Remember me functionality
- Multi-factor authentication
- Role-based access control
- Session timeout handling
- Real-time session validation
