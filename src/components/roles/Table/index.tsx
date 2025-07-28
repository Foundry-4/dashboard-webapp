import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { RolesResponse } from '@/domain/interfaces/roles'

import { columns } from '@/components/roles/Table/columns'
import { TableTemplate } from '@/components/templates/TableTemplate'
import { RoleQueries } from '@/services/queries/roles'
import { useRolesFilterStore } from '@/stores/rolesFilterStore'

export const RolesTable = () => {
  const navigate = useNavigate()
  const {
    deleted,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection,
    setPage,
    setPageSize
  } = useRolesFilterStore()
  const [rowSelection, setRowSelection] = useState<string[]>([])

  const { data: users, isLoading } = RoleQueries.useGetRoles({
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

  const handleRowClick = useCallback(
    (role: RolesResponse) => {
      navigate(`/roles/edit-role/${role.roleId}`)
    },
    [navigate]
  )

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
    <TableTemplate<RolesResponse>
      data={users?.data?.data || []}
      isLoading={isLoading}
      columns={columns}
      fixedRows={10}
      pagination={pagination}
      deleted={deleted}
      rowSelection={rowSelection}
      onRowSelectionChange={handleRowSelectionChange}
      onRowClick={handleRowClick}
      getRowId={row => row.roleId?.toString()}
    />
  )
}
