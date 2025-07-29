import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { Company, GetCompaniesParams } from '@/domain/interfaces/company'

import { api } from '@/services/api'
import { buildQueryString } from '@/utils/query'

// Mock data for development
const mockCompanies: Company[] = [
  {
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: null,
    companyId: 1,
    corporateName: 'Tech Solutions Ltda',
    cnpj: '12345678000195',
    nameFantasy: 'Tech Solutions',
    phone: '(11) 99999-9999',
    email: 'contato@techsolutions.com',
    whatsapp: '(11) 99999-9999',
    logoUrl: null,
    workingHoursWeek: '08:00 - 18:00',
    workingHoursSaturday: '08:00 - 12:00',
    workingHoursSunday: 'Fechado',
    deleted: false
  },
  {
    createdAt: '2024-01-20T14:45:00Z',
    updatedAt: null,
    companyId: 2,
    corporateName: 'Digital Innovations S.A.',
    cnpj: '98765432000187',
    nameFantasy: 'Digital Innovations',
    phone: '(21) 88888-8888',
    email: 'contato@digitalinnovations.com',
    whatsapp: '(21) 88888-8888',
    logoUrl: null,
    workingHoursWeek: '09:00 - 17:00',
    workingHoursSaturday: '09:00 - 13:00',
    workingHoursSunday: 'Fechado',
    deleted: false
  },
  {
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: null,
    companyId: 3,
    corporateName: 'Creative Studio Ltda',
    cnpj: '45678912000134',
    nameFantasy: 'Creative Studio',
    phone: '(31) 77777-7777',
    email: 'contato@creativestudio.com',
    whatsapp: '(31) 77777-7777',
    logoUrl: null,
    workingHoursWeek: '08:30 - 18:30',
    workingHoursSaturday: '08:30 - 12:30',
    workingHoursSunday: 'Fechado',
    deleted: true
  }
]

export const getCompanies = async (
  params?: GetCompaniesParams
): Promise<ApiResponseWithPagination<Company[]>> => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let filteredCompanies = [...mockCompanies]

    // Filter by deleted status
    if (params?.deleted !== undefined) {
      filteredCompanies = filteredCompanies.filter(
        company => company.deleted === params.deleted
      )
    }

    // Filter by search
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      filteredCompanies = filteredCompanies.filter(
        company =>
          company.nameFantasy.toLowerCase().includes(searchLower) ||
          company.corporateName.toLowerCase().includes(searchLower) ||
          company.cnpj.includes(params.search || '') ||
          company.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    if (params?.sortBy) {
      filteredCompanies.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Company]
        const bValue = b[params.sortBy as keyof Company]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return params.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        return 0
      })
    }

    // Pagination
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

    return {
      status: true,
      message: 'Empresas recuperadas com sucesso',
      data: {
        data: paginatedCompanies,
        totalItems: filteredCompanies.length,
        totalPages: Math.ceil(filteredCompanies.length / pageSize),
        page: page,
        pageSize: pageSize
      }
    }
  }

  // Real API call
  const queryString = params ? buildQueryString<GetCompaniesParams>(params) : ''
  const response = await api.get(
    `/companies${queryString ? `?${queryString}` : ''}`
  )
  return response.data
}
