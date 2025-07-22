export interface ApiResponse<T> {
  data: T
  message: string
  status: boolean
}

export type ApiResponseWithPagination<T> = ApiResponse<{ data: T }> & {
  totalItems: number
  page: number
  pageSize: number
}

export type PaginationParams = {
  page: number
  pageSize: number
  sortBy: string
  sortDirection: 'asc' | 'desc'
}
