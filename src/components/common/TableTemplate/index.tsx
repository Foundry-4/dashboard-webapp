import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type HeaderGroup,
  type Row,
  type SortingState
} from '@tanstack/react-table'
import {
  createElement,
  useCallback,
  useMemo,
  useState,
  type ComponentType
} from 'react'

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
}

export const TableTemplate = <T,>({
  data,
  columns,
  isLoading,
  fixedRows = 10,
  pagination
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

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  })

  const rows = table.getRowModel().rows

  const handlePageSizeChange = useCallback(
    (size: number) => {
      onPageSizeChange?.(size)
      onPageChange?.(1)
    },
    [onPageChange, onPageSizeChange]
  )

  const headerComponent = useMemo(
    () =>
      createElement(
        TableHeader as ComponentType<{
          headerGroups: HeaderGroup<T>[]
          sorting: SortingState
        }>,
        {
          headerGroups: table.getHeaderGroups(),
          sorting
        }
      ),
    [table, sorting]
  )

  const tableBodyComponent = useMemo(
    () =>
      createElement(
        TableBody as ComponentType<{
          rows: Row<T>[]
          fixedRows?: number
        }>,
        {
          rows,
          fixedRows
        }
      ),
    [rows, fixedRows]
  )

  const tableContent = useMemo(() => {
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
    const containerStyle = fixedRows
      ? {
          height: `${fixedRows * 49 + 40}px`,
          maxHeight: `${fixedRows * 49 + 40}px !important`,
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
    headerComponent,
    tableBodyComponent,
    showPagination,
    onPageChange,
    rows.length,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    pageSizeOptions,
    handlePageSizeChange
  ])

  return (
    <div className="w-full overflow-x-auto rounded-sm border">
      <div className="min-w-full">{tableContent}</div>
    </div>
  )
}
