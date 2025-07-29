import type { ApiResponse } from '@/domain/interfaces/apiResponse'
import type { Company, CreateCompanyParams } from '@/domain/interfaces/company'

import { api } from '@/services/api'

export const createCompany = async (
  data: CreateCompanyParams
): Promise<ApiResponse<Company>> => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockCompany: Company = {
      createdAt: new Date().toISOString(),
      updatedAt: null,
      companyId: Math.floor(Math.random() * 1000) + 100,
      corporateName: data.corporateName,
      cnpj: data.cnpj,
      nameFantasy: data.nameFantasy,
      phone: data.phone,
      email: data.email,
      whatsapp: data.whatsapp || null,
      logoUrl: data.logoUrl || null,
      workingHoursWeek: data.workingHoursWeek,
      workingHoursSaturday: data.workingHoursSaturday,
      workingHoursSunday: data.workingHoursSunday,
      deleted: false
    }

    return {
      status: true,
      message: 'Empresa criada com sucesso',
      data: mockCompany
    }
  }

  // Real API call
  const response = await api.post('/companies', data)
  return response.data
}
