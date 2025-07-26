import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState
} from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { TableBody } from '@/components/templates/TableTemplate/Body'
import { EmptyState } from '@/components/templates/TableTemplate/EmptyState'
import { TableHeader } from '@/components/templates/TableTemplate/Header'
import { MultipleRowSelectionActionArea } from '@/components/templates/TableTemplate/MultipleRowSelectionActionArea'
import { TablePagination } from '@/components/templates/TableTemplate/Pagination'
import { TableSkeleton } from '@/components/templates/TableTemplate/Skeleton'
import { Table } from '@/components/ui/table'

interface Pagination {
  currentPage?: number
  totalItems?: number
  totalPages?: number
  pageSize?: number
  showPagination?: boolean
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

interface TableTemplateProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  fixedRows?: number
  rowSelection?: string[]
  deleted?: boolean
  pagination?: Pagination
  getRowId?: (row: T) => string
  onRowSelectionChange?: (rowSelection: string[]) => void
  onRowClick?: (row: T) => void
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
  getRowId,
  deleted,
  onRowClick
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

  const rowSelectionState = useMemo(
    () =>
      rowSelection?.reduce((acc, id) => {
        acc[id] = true
        return acc
      }, {} as RowSelectionState) || {},
    [rowSelection]
  )

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

  const selectedRows = table.getSelectedRowModel().rows
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
        onRowClick={onRowClick}
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
      <div className="flex flex-col gap-4">
        {selectedRows.length ? (
          <MultipleRowSelectionActionArea
            userIds={selectedRows.map(row => Number(getRowId?.(row.original)))}
            deleted={deleted}
          />
        ) : null}

        <div className="overflow-x-auto rounded-sm border">
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
        </div>
      </div>
    )
  }, [
    showPagination,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    pageSizeOptions,
    selectedRows,
    rows,
    sorting,
    table,
    isLoading,
    columns.length,
    fixedRows,
    deleted,
    getRowId,
    onRowClick,
    onPageChange,
    handlePageSizeChange
  ])

  return <div className="w-full">{tableContent}</div>
}
