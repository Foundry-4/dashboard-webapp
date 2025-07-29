import { z } from 'zod'

export const createCompanySchema = z
  .object({
    corporateName: z.string().min(1, 'Razão social é obrigatória'),
    cnpj: z
      .string()
      .min(14, 'CNPJ deve ter 14 dígitos')
      .max(14, 'CNPJ deve ter 14 dígitos')
      .regex(/^\d{14}$/, 'CNPJ deve conter apenas números'),
    nameFantasy: z.string().min(1, 'Nome fantasia é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.string().email('Email inválido'),
    whatsapp: z.string().optional(),
    logoUrl: z.string().optional(),
    workingHoursWeek: z
      .string()
      .min(1, 'Horário de funcionamento da semana é obrigatório'),
    workingHoursSaturday: z
      .string()
      .min(1, 'Horário de funcionamento do sábado é obrigatório'),
    workingHoursSunday: z
      .string()
      .min(1, 'Horário de funcionamento do domingo é obrigatório')
  })
  .refine(
    data => {
      // CNPJ validation (basic check)
      const cnpj = data.cnpj.replace(/\D/g, '')
      if (cnpj.length !== 14) return false

      // Check if all digits are the same (invalid CNPJ)
      if (/^(\d)\1{13}$/.test(cnpj)) return false

      return true
    },
    {
      message: 'CNPJ inválido',
      path: ['cnpj']
    }
  )

export const updateCompanySchema = createCompanySchema.extend({
  companyId: z.number().positive('ID da empresa é obrigatório')
})
