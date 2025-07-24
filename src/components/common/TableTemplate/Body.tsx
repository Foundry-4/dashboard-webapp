import { flexRender, type Row } from '@tanstack/react-table'
import { memo } from 'react'

import {
  TableBody as TableBodyUI,
  TableCell,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface TableBodyProps<T> {
  rows: Row<T>[]
  fixedRows?: number
}

export const TableBody = memo(<T,>({ rows, fixedRows }: TableBodyProps<T>) => {
  const emptyRowsCount =
    fixedRows && rows.length < fixedRows ? fixedRows - rows.length : 0
  const cellsPerRow = rows[0]?.getVisibleCells().length ?? 1

  return (
    <TableBodyUI>
      {rows.map((row, idx) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={cn('bg-input/10', idx % 2 === 0 && 'bg-white')}
        >
          {row.getVisibleCells().map(cell => {
            const cellContent = flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )
            return (
              <TableCell
                key={cell.id}
                className="truncate px-4"
                title={cellContent as string}
              >
                {cellContent}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
      {/* Render empty rows if needed */}
      {Array.from({ length: emptyRowsCount }).map((_, idx) => (
        <TableRow
          key={`empty-row-${idx}`}
          className={cn(
            'bg-input/10 h-[49px]',
            (rows.length + idx) % 2 === 0 && 'bg-white'
          )}
        >
          {Array.from({ length: cellsPerRow }).map((_, cellIdx) => (
            <TableCell
              key={`empty-cell-${cellIdx}`}
              className="truncate px-4"
            >
              {/* Empty cell */}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBodyUI>
  )
})

TableBody.displayName = 'TableBody'
