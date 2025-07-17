export const PAGE_TITLES = {
  // Dashboard pages
  dashboard: 'Dashboard | NaMesaJá',
  changePassword: 'Alterar senha | NaMesaJá',
  
  // Auth pages
  login: 'Entrar | NaMesaJá',
  register: 'Cadastrar | NaMesaJá',
  forgotPassword: 'Esqueci minha senha | NaMesaJá',
  resetPassword: 'Redefinir Senha | NaMesaJá',
  confirmAccount: 'Confirmar Conta | NaMesaJá',
  verify2FA: 'Verificação de dois fatores | NaMesaJá',
  
  // Default
  default: 'NaMesaJá'
} as const;

export type PageTitleKey = keyof typeof PAGE_TITLES; 