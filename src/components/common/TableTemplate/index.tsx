import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type HeaderGroup,
  type Row,
  type SortingState
} from '@tanstack/react-table'
import { createElement, useState, type ComponentType } from 'react'

import type { UseQueryResult } from '@tanstack/react-query'

import { TableBody } from '@/components/common/TableTemplate/Body'
import { TableHeader } from '@/components/common/TableTemplate/Header'
import { TableSkeleton } from '@/components/common/TableTemplate/Skeleton'
import { Table } from '@/components/ui/table'

interface TableTemplateProps<T> {
  query: UseQueryResult<{ data: T[] }>
  columns: ColumnDef<T>[]
}

export const TableTemplate = <T,>({
  query,
  columns
}: TableTemplateProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: query.data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  })

  const headerComponent = createElement(
    TableHeader as ComponentType<{
      headerGroups: HeaderGroup<T>[]
      sorting: SortingState
    }>,
    {
      headerGroups: table.getHeaderGroups(),
      sorting: sorting
    }
  )

  if (query.isLoading) {
    return (
      <TableSkeleton
        columnCount={columns.length}
        headerComponent={headerComponent}
      />
    )
  }

  const rows = table.getRowModel().rows

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <div className="min-w-full">
        <Table>
          {headerComponent}
          {createElement(TableBody as ComponentType<{ rows: Row<T>[] }>, {
            rows: rows
          })}
        </Table>
      </div>
    </div>
  )
}
