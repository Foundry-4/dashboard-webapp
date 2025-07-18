export const ROUTE_TITLES = {
  // Dashboard pages
  dashboard: 'Dashboard | NaMesaJá',
  changePassword: 'Alterar senha | NaMesaJá',
  profile: 'Perfil | NaMesaJá',

  // Auth pages
  login: 'Entrar | NaMesaJá',
  register: 'Cadastrar | NaMesaJá',
  forgotPassword: 'Esqueci minha senha | NaMesaJá',
  resetPassword: 'Redefinir Senha | NaMesaJá',
  confirmAccount: 'Confirmar Conta | NaMesaJá',
  verify2FA: 'Verificação de dois fatores | NaMesaJá',

  // Default
  default: 'NaMesaJá'
} as const

export type RouteTitleKeys = keyof typeof ROUTE_TITLES

export const PAGE_TITLES = {
  dashboard: 'Dashboard',
  profile: 'Perfil',
  changePassword: 'Alterar senha',
  roles: 'Cargos',
  users: 'Usuários'
} as const

export type PageTitleKeys = keyof typeof PAGE_TITLES
