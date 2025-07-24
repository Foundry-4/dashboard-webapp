import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState
} from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { TableBody } from '@/components/common/TableTemplate/Body'
import { EmptyState } from '@/components/common/TableTemplate/EmptyState'
import { TableHeader } from '@/components/common/TableTemplate/Header'
import { TablePagination } from '@/components/common/TableTemplate/Pagination'
import { TableSkeleton } from '@/components/common/TableTemplate/Skeleton'
import { Table } from '@/components/ui/table'

interface TableTemplateProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  fixedRows?: number
  rowSelection?: string[]
  pagination?: {
    currentPage?: number
    totalItems?: number
    totalPages?: number
    pageSize?: number
    showPagination?: boolean
    pageSizeOptions?: number[]
    onPageChange?: (page: number) => void
    onPageSizeChange?: (size: number) => void
  }
  getRowId?: (row: T) => string
  onRowSelectionChange?: (rowSelection: string[]) => void
}

export const TableTemplate = <
  T extends { userId?: string | number; id?: string | number }
>({
  data,
  columns,
  isLoading,
  fixedRows = 10,
  pagination,
  rowSelection,
  onRowSelectionChange,
  getRowId
}: TableTemplateProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    pageSize = 10,
    showPagination = false,
    pageSizeOptions = [10, 20, 50, 100],
    onPageChange,
    onPageSizeChange
  } = pagination || {}

  const rowSelectionState = useMemo(() => {
    return (
      rowSelection?.reduce((acc, id) => {
        acc[id] = true
        return acc
      }, {} as RowSelectionState) || {}
    )
  }, [rowSelection])

  const selectColumn: ColumnDef<T> = {
    id: 'select',
    size: 48,
    enableSorting: false,
    enableColumnFilter: false,
    meta: { isSelection: true }
  }

  const handleRowSelectionChange = useCallback(
    (
      updaterOrValue:
        | RowSelectionState
        | ((rowSelection: RowSelectionState) => RowSelectionState)
    ) => {
      const newSelection =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(rowSelectionState)
          : updaterOrValue
      const value = Object.keys(newSelection).filter(
        key => newSelection[key] === true
      )
      onRowSelectionChange?.(value)
    },
    [onRowSelectionChange, rowSelectionState]
  )

  const table = useReactTable({
    data: data || [],
    columns: [selectColumn, ...columns],
    state: {
      sorting,
      rowSelection: rowSelectionState
    },
    enableMultiRowSelection: true,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange
  })

  const rows = table.getRowModel().rows

  const handlePageSizeChange = useCallback(
    (size: number) => {
      onPageSizeChange?.(size)
      onPageChange?.(1)
    },
    [onPageChange, onPageSizeChange]
  )

  const tableContent = useMemo(() => {
    const headerComponent = (
      <TableHeader<T>
        headerGroups={table.getHeaderGroups()}
        sorting={sorting}
        table={table}
      />
    )

    const tableBodyComponent = (
      <TableBody<T>
        rows={rows}
        fixedRows={fixedRows}
      />
    )

    if (isLoading) {
      return (
        <TableSkeleton
          columnCount={columns.length}
          rowCount={fixedRows}
          headerComponent={headerComponent}
        />
      )
    }

    if (!rows.length) {
      return <EmptyState />
    }

    const height = fixedRows ? fixedRows * 49 + 40 + 12 : 500

    const containerStyle = fixedRows
      ? {
          height: `${height}px`,
          maxHeight: `${height}px !important`,
          overflowY: 'auto' as const
        }
      : undefined

    return (
      <>
        <Table containerStyle={containerStyle}>
          {headerComponent}
          {tableBodyComponent}
        </Table>
        {showPagination && onPageChange && rows.length > 0 && (
          <div className="bg-muted/50 border-t">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={onPageChange}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </>
    )
  }, [
    isLoading,
    columns.length,
    fixedRows,
    showPagination,
    onPageChange,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    pageSizeOptions,
    handlePageSizeChange,
    rows,
    sorting,
    table
  ])

  return (
    <div className="w-full overflow-x-auto rounded-sm border">
      <div className="min-w-full">{tableContent}</div>
    </div>
  )
}
