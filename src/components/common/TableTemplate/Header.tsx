import {
  flexRender,
  type HeaderGroup,
  type SortingState,
  type Table
} from '@tanstack/react-table'
import { ChevronsUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import {
  TableHead,
  TableHeader as TableHeaderUI,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[]
  sorting: SortingState
  table: Table<T>
}

export const TableHeader = <T,>({
  headerGroups,
  sorting,
  table
}: TableHeaderProps<T>) => {
  return (
    <TableHeaderUI className="!mx-2">
      {headerGroups.map(headerGroup => (
        <TableRow
          key={headerGroup.id}
          className="bg-orange-300 hover:bg-orange-300"
        >
          {headerGroup.headers.map(header => {
            const size = header.getSize()
            const cellStyle = {
              width: `${size}px`,
              minWidth: `${size}px`,
              maxWidth: `${size}px`
            }

            const canSort = header.column.getCanSort()
            const currentSort = sorting.find(
              sort => sort.id === header.column.id
            )
            const actualSortDirection = currentSort?.desc
              ? 'desc'
              : currentSort
                ? 'asc'
                : false

            // Render selection checkbox for select column
            if (header.column.id === 'select') {
              return (
                <TableHead
                  key={header.id}
                  className="px-4 font-bold"
                  style={cellStyle}
                >
                  <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={
                      !table.getIsAllPageRowsSelected() &&
                      table.getIsSomePageRowsSelected()
                    }
                    onCheckedChange={value =>
                      table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                  />
                </TableHead>
              )
            }

            return (
              <TableHead
                key={header.id}
                className="px-4 font-bold"
                style={cellStyle}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-1 select-none',
                      canSort && 'hover:text-gray-600'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {canSort && (
                      <span className="ml-1">
                        <ChevronsUpDown
                          className={cn(
                            'relative h-4 w-4',
                            actualSortDirection === 'asc' &&
                              '[&>path:first-child]:text-gray-400 [&>path:last-child]:text-blue-600',
                            actualSortDirection === 'desc' &&
                              '[&>path:first-child]:text-blue-600 [&>path:last-child]:text-gray-400',
                            !actualSortDirection && 'text-gray-400'
                          )}
                        />
                      </span>
                    )}
                  </div>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeaderUI>
  )
}

TableHeader.displayName = 'TableHeader'
