import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome completo é obrigatório'),
    email: z.string().email('Email inválido'),
    confirmEmail: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(/[!@#$%^&*]/, 'Senha deve conter pelo menos um caractere especial')
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'Emails não coincidem',
    path: ['confirmEmail']
  })

export const verify2FASchema = z.object({
  otp: z.string().length(6, 'Código deve ter 6 dígitos')
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(/[!@#$%^&*]/, 'Senha deve conter pelo menos um caractere especial')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*]/,
        'Senha deve conter pelo menos um caractere especial'
      ),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(/[!@#$%^&*]/, 'Senha deve conter pelo menos um caractere especial')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

export const createUserSchema = z
  .object({
    name: z.string().min(1, 'Nome completo é obrigatório'),
    email: z.string().email('Email inválido'),
    confirmEmail: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*]/,
        'Senha deve conter pelo menos um caractere especial'
      ),
    roleId: z.string().min(1, 'Permissão é obrigatória'),
    twoFactorEnabled: z.boolean().optional()
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'Emails não coincidem',
    path: ['confirmEmail']
  })
