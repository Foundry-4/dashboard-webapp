import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Company } from '@/domain/interfaces/company'

import { columns } from '@/components/companies/Table/columns'
import { TableTemplate } from '@/components/templates/TableTemplate'
import { CompanyQueries } from '@/services/queries/company'
import { useCompaniesFilterStore } from '@/stores/companiesFilterStore'

export const CompaniesTable = () => {
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
  } = useCompaniesFilterStore()
  const [rowSelection, setRowSelection] = useState<string[]>([])

  const { data: companies, isLoading } = CompanyQueries.useGetCompanies({
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
    (company: Company) => {
      navigate(`/companies/edit-company/${company.companyId}`)
    },
    [navigate]
  )

  const pagination = useMemo(() => {
    return {
      currentPage: page,
      totalItems: companies?.data?.totalItems || 0,
      totalPages: companies?.data?.totalPages || 1,
      pageSize: pageSize,
      showPagination: true,
      pageSizeOptions: [10, 20, 50, 100],
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange
    }
  }, [page, pageSize, companies, handlePageChange, handlePageSizeChange])

  return (
    <TableTemplate<Company>
      data={companies?.data?.data || []}
      isLoading={isLoading}
      columns={columns}
      fixedRows={10}
      pagination={pagination}
      deleted={deleted}
      rowSelection={rowSelection}
      onRowSelectionChange={handleRowSelectionChange}
      onRowClick={handleRowClick}
      getRowId={row => row.companyId?.toString()}
    />
  )
}
