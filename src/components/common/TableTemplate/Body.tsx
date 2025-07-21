import { flexRender, type Row } from '@tanstack/react-table'
import { memo } from 'react'

import {
  TableBody as TableBodyUI,
  TableCell,
  TableRow
} from '@/components/ui/table'
import { columns } from '@/components/users/Table/columns'

interface TableBodyProps<T> {
  rows: Row<T>[]
}

export const TableBody = memo(<T,>({ rows }: TableBodyProps<T>) => {
  if (!rows?.length) {
    return (
      <TableBodyUI>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            Nenhum resultado encontrado.
          </TableCell>
        </TableRow>
      </TableBodyUI>
    )
  }

  return (
    <TableBodyUI>
      {rows.map(row => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
        >
          {row.getVisibleCells().map(cell => {
            const cellContent = flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )
            return (
              <TableCell
                key={cell.id}
                className="truncate"
                title={cellContent as string}
              >
                {cellContent}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBodyUI>
  )
})

TableBody.displayName = 'TableBody'
