export interface Company {
  createdAt: string
  updatedAt: string | null
  companyId: number
  corporateName: string
  cnpj: string
  nameFantasy: string
  phone: string
  email: string
  whatsapp: string | null
  logoUrl: string | null
  workingHoursWeek: string
  workingHoursSaturday: string
  workingHoursSunday: string
  deleted: boolean
}

export interface Branch {
  createdAt: string
  updatedAt: string | null
  companyId: number
  branchId: number
  nameFantasy: string
  phone: string
  email: string
  address: string
  addressNumber: string
  district: string
  zipCode: string | null
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  imageUrl: string | null
  workingHoursWeek: string
  workingHoursSaturday: string
  workingHoursSunday: string
  deleted: boolean
}

export interface GetCompaniesParams {
  deleted?: boolean
  search?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface CreateCompanyParams {
  corporateName: string
  cnpj: string
  nameFantasy: string
  phone: string
  email: string
  whatsapp?: string
  logoUrl?: string
  workingHoursWeek: string
  workingHoursSaturday: string
  workingHoursSunday: string
}

export interface UpdateCompanyParams extends CreateCompanyParams {
  companyId: number
}
