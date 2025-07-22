import { create } from 'zustand'

interface UsersFilterState {
  deleted: boolean
  search: string
  page: number
  pageSize: number
  sortBy: string
  sortDirection: 'asc' | 'desc'
  setDeleted: (deleted: boolean) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setSortBy: (sortBy: string) => void
  setSortDirection: (sortDirection: 'asc' | 'desc') => void
  reset: () => void
}

export const useUsersFilterStore = create<UsersFilterState>(set => ({
  deleted: false,
  search: '',
  page: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: 'desc',
  setDeleted: deleted => set({ deleted }),
  setSearch: search => set({ search }),
  setPage: page => set({ page }),
  setPageSize: pageSize => set({ pageSize }),
  setSortBy: sortBy => set({ sortBy }),
  setSortDirection: sortDirection => set({ sortDirection }),
  reset: () =>
    set({
      deleted: false,
      search: '',
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortDirection: 'desc'
    })
}))
