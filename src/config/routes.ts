import {
  BarChart3,
  FileText,
  FolderKey,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export interface RouteConfig {
  path: string
  title: string
  routeTitle: string
  icon?: LucideIcon
  label?: string
  isPrivate?: boolean
  isAdminOnly?: boolean
}

export interface SidebarGroup {
  label: string | null
  routes: RouteConfig[]
}

export const ROUTES: Record<string, RouteConfig> = {
  // Auth routes
  login: {
    path: '/login',
    title: 'Entrar',
    routeTitle: 'Entrar | NaMesaJá',
    isPrivate: false
  },
  register: {
    path: '/register',
    title: 'Cadastrar',
    routeTitle: 'Cadastrar | NaMesaJá',
    isPrivate: false
  },
  forgotPassword: {
    path: '/forgot-password',
    title: 'Esqueci minha senha',
    routeTitle: 'Esqueci minha senha | NaMesaJá',
    isPrivate: false
  },
  resetPassword: {
    path: '/reset-password',
    title: 'Redefinir Senha',
    routeTitle: 'Redefinir Senha | NaMesaJá',
    isPrivate: false
  },
  confirmAccount: {
    path: '/confirm-account',
    title: 'Confirmar Conta',
    routeTitle: 'Confirmar Conta | NaMesaJá',
    isPrivate: false
  },
  verify2FA: {
    path: '/verify-2fa',
    title: 'Verificação de dois fatores',
    routeTitle: 'Verificação de dois fatores | NaMesaJá',
    isPrivate: false
  },

  // Dashboard routes
  dashboard: {
    path: '/',
    title: 'Início',
    routeTitle: 'Início | NaMesaJá',
    icon: LayoutDashboard,
    label: 'Início',
    isPrivate: true
  },
  profile: {
    path: '/profile',
    title: 'Perfil',
    routeTitle: 'Perfil | NaMesaJá',
    isPrivate: true
  },
  users: {
    path: '/users',
    title: 'Usuários',
    routeTitle: 'Usuários | NaMesaJá',
    icon: Users,
    label: 'Usuários',
    isPrivate: true,
    isAdminOnly: true
  },
  createUser: {
    path: '/users/create-user',
    title: 'Criar usuário',
    routeTitle: 'Criar usuário | NaMesaJá',
    isPrivate: true,
    isAdminOnly: true
  },
  editUser: {
    path: '/users/edit-user/:userId',
    title: 'Editar usuário',
    routeTitle: 'Editar usuário | NaMesaJá',
    isPrivate: true,
    isAdminOnly: true
  },
  roles: {
    path: '/roles',
    title: 'Permissões',
    routeTitle: 'Permissões | NaMesaJá',
    icon: FolderKey,
    label: 'Permissões',
    isPrivate: true,
    isAdminOnly: true
  },

  // Static examples just to fill space
  reports: {
    path: '/reports',
    title: 'Relatórios',
    routeTitle: 'Relatórios | NaMesaJá',
    icon: BarChart3,
    label: 'Relatórios',
    isPrivate: true
  },
  documents: {
    path: '/documents',
    title: 'Documentos',
    routeTitle: 'Documentos | NaMesaJá',
    icon: FileText,
    label: 'Documentos',
    isPrivate: true
  },
  settings: {
    path: '/settings',
    title: 'Configurações',
    routeTitle: 'Configurações | NaMesaJá',
    icon: Settings,
    label: 'Configurações',
    isPrivate: true
  }
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: null,
    routes: [ROUTES.dashboard]
  },
  {
    label: 'CONTEÚDO',
    routes: [ROUTES.reports, ROUTES.documents]
  },
  {
    label: 'ADMINISTRAÇÃO',
    routes: [ROUTES.users, ROUTES.roles]
  },
  {
    label: 'SISTEMA',
    routes: [ROUTES.settings]
  }
]

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | null => {
  const allRoutes = Object.values(ROUTES)
  return allRoutes.find(route => route.path === path) || null
}

export const getSidebarGroups = (isAdmin: boolean) => {
  return SIDEBAR_GROUPS.filter(
    group => !group.routes.some(route => route.isAdminOnly && !isAdmin)
  )
}
