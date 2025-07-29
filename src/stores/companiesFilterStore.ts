import { create } from 'zustand'

import type { GetCompaniesParams } from '@/domain/interfaces/company'

interface CompaniesFilterStore extends GetCompaniesParams {
  setDeleted: (deleted: boolean) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSortBy: (sortBy: string) => void
  setSortDirection: (sortDirection: 'asc' | 'desc') => void
  reset: () => void
}

const initialState: GetCompaniesParams = {
  deleted: false,
  search: '',
  page: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: 'desc'
}

export const useCompaniesFilterStore = create<CompaniesFilterStore>(set => ({
  ...initialState,
  setDeleted: deleted => set({ deleted, page: 1 }),
  setSearch: search => set({ search, page: 1 }),
  setPage: page => set({ page }),
  setPageSize: pageSize => set({ pageSize, page: 1 }),
  setSortBy: sortBy => set({ sortBy, page: 1 }),
  setSortDirection: sortDirection => set({ sortDirection, page: 1 }),
  reset: () => set(initialState)
}))
