import {
  Building2,
  FileText,
  FolderKey,
  LayoutDashboard,
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

const AUTH_ROUTES: Record<string, RouteConfig> = {
  login: {
    path: '/login',
    title: 'Entrar',
    routeTitle: 'Entrar | Foundry4 Admin',
    isPrivate: false
  },
  register: {
    path: '/register',
    title: 'Cadastrar',
    routeTitle: 'Cadastrar | Foundry4 Admin',
    isPrivate: false
  },
  forgotPassword: {
    path: '/forgot-password',
    title: 'Esqueci minha senha',
    routeTitle: 'Esqueci minha senha | Foundry4 Admin',
    isPrivate: false
  },
  resetPassword: {
    path: '/reset-password',
    title: 'Redefinir Senha',
    routeTitle: 'Redefinir Senha | Foundry4 Admin',
    isPrivate: false
  },
  confirmAccount: {
    path: '/confirm-account',
    title: 'Confirmar Conta',
    routeTitle: 'Confirmar Conta | Foundry4 Admin',
    isPrivate: false
  },
  verify2FA: {
    path: '/verify-2fa',
    title: 'Verificação de dois fatores',
    routeTitle: 'Verificação de dois fatores | Foundry4 Admin',
    isPrivate: false
  }
}

const DASHBOARD_ROUTES: Record<string, RouteConfig> = {
  dashboard: {
    path: '/',
    title: 'Início',
    routeTitle: 'Início | Foundry4 Admin',
    icon: LayoutDashboard,
    label: 'Início',
    isPrivate: true
  },
  profile: {
    path: '/profile',
    title: 'Perfil',
    routeTitle: 'Perfil | Foundry4 Admin',
    isPrivate: true
  },
  users: {
    path: '/users',
    title: 'Usuários',
    routeTitle: 'Usuários | Foundry4 Admin',
    icon: Users,
    label: 'Usuários',
    isPrivate: true,
    isAdminOnly: true
  },
  createUser: {
    path: '/users/create-user',
    title: 'Criar usuário',
    routeTitle: 'Criar usuário | Foundry4 Admin',
    isPrivate: true,
    isAdminOnly: true
  },
  editUser: {
    path: '/users/edit-user/:userId',
    title: 'Editar usuário',
    routeTitle: 'Editar usuário | Foundry4 Admin',
    isPrivate: true,
    isAdminOnly: true
  },
  roles: {
    path: '/roles',
    title: 'Permissões',
    routeTitle: 'Permissões | Foundry4 Admin',
    icon: FolderKey,
    label: 'Permissões',
    isPrivate: true,
    isAdminOnly: true
  },
  companies: {
    path: '/companies',
    title: 'Empresas',
    routeTitle: 'Empresas | Foundry4 Admin',
    icon: Building2,
    label: 'Empresas',
    isPrivate: true
  },
  services: {
    path: '/services',
    title: 'Serviços',
    routeTitle: 'Serviços | Foundry4 Admin',
    icon: FileText,
    label: 'Serviços',
    isPrivate: true
  }
}

export const ROUTES: Record<string, RouteConfig> = {
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: null,
    routes: [ROUTES.dashboard]
  },
  {
    label: 'GESTÃO DE CLIENTES',
    routes: [ROUTES.companies, ROUTES.services]
  },
  {
    label: 'ADMINISTRAÇÃO',
    routes: [ROUTES.users, ROUTES.roles]
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
