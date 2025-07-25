import { useCallback, useMemo, useState } from 'react'

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
  const [rowSelection, setRowSelection] = useState<string[]>([])

  const { data: users, isLoading } = UserQueries.useGetUsers({
    deleted,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection
  })

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
    },
    [setPage]
  )

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => setPageSize(newPageSize),
    [setPageSize]
  )

  const handleRowSelectionChange = useCallback((newSelection: string[]) => {
    setRowSelection(newSelection)
  }, [])

  const pagination = useMemo(() => {
    return {
      currentPage: page,
      totalItems: users?.data?.totalItems || 0,
      totalPages: users?.data?.totalPages || 1,
      pageSize: pageSize,
      showPagination: true,
      pageSizeOptions: [10, 20, 50, 100],
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange
    }
  }, [page, pageSize, users, handlePageChange, handlePageSizeChange])

  return (
    <TableTemplate<User>
      data={users?.data?.data || []}
      isLoading={isLoading}
      columns={columns}
      fixedRows={10}
      pagination={pagination}
      deleted={deleted}
      rowSelection={rowSelection}
      onRowSelectionChange={handleRowSelectionChange}
      getRowId={row => row.userId?.toString()}
    />
  )
}
