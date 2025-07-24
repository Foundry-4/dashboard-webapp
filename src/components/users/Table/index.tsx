import type { User } from '@/domain/interfaces/user'

import { TableTemplate } from '@/components/common/TableTemplate/index'
import { columns } from '@/components/users/Table/columns'
import { UserQueries } from '@/services/queries/user'
import { useUsersFilterStore } from '@/stores/usersFilterStore'

export const UsersTable = () => {
  const {
    deleted,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection,
    setPage,
    setPageSize
  } = useUsersFilterStore()

  const { data: users, isLoading } = UserQueries.useGetUsers({
    deleted,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  return (
    <TableTemplate<User>
      data={users?.data?.data || []}
      isLoading={isLoading}
      columns={columns}
      fixedRows={10}
      pagination={{
        currentPage: page,
        totalItems: users?.data?.totalItems || 0,
        totalPages: users?.data?.totalPages || 1,
        pageSize: pageSize,
        onPageChange: handlePageChange,
        showPagination: true,
        pageSizeOptions: [10, 20, 50, 100],
        onPageSizeChange: handlePageSizeChange
      }}
    />
  )
}
