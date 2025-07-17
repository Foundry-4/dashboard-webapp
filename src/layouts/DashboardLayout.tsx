import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, User } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text !text-xl font-bold text-transparent">
            NaMesaJá
          </h1>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/')}
              className="flex w-full items-center rounded-lg !bg-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
            {/* Add more navigation items here */}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 !bg-transparent !text-gray-700 hover:!bg-transparent hover:!text-gray-700"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
