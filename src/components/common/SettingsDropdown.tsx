import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/hooks/useAuth'

export const SettingsDropdown = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:!ring-0"
      >
        <Button
          variant="outline"
          size="sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <User className="h-4 w-4" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          Tema {theme === 'dark' ? 'claro' : 'escuro'}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
