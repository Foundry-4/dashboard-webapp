import { ChevronDown, LogOut, Moon, Sun, User } from 'lucide-react'
import { useNavigate } from 'react-router'

import { ProfileQueries } from '../../services/queries/profile'

import { AvatarWithFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/hooks/useAuth'
import { useModalStore } from '@/stores/useModalStore'

export const SettingsDropdown = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { openModal } = useModalStore()
  const profile = ProfileQueries.useGetProfile()

  const handleLogout = () => {
    openModal({
      title: 'Confirmar saída',
      message: 'Tem certeza que deseja sair da sua conta?',
      confirmText: 'Sair',
      cancelText: 'Cancelar',
      onConfirm: () => logout(),
      isDestructive: false
    })
  }

  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <AvatarWithFallback
            fallback={profile?.data?.name?.charAt(0) || ''}
            src={profile?.data?.profilePictureUrl || ''}
            className="size-10"
          />

          <div className="flex flex-col">
            <p className="text-sm font-medium">
              {profile?.data?.name?.toUpperCase()}
            </p>
            <p className="text-muted-foreground text-sm">
              {profile?.data?.roleName}
            </p>
          </div>
        </div>

        <DropdownMenuTrigger
          asChild
          className="focus-visible:!ring-0"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-8 rounded-full !border-none"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        align="end"
        className="mt-2 w-[350px] rounded-sm p-2 shadow-xl"
      >
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
