import { flexRender, type Row } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import {
  TableBody as TableBodyUI,
  TableCell,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface TableBodyProps<T> {
  rows: Row<T>[]
  fixedRows?: number
  onRowClick?: (row: T) => void
}

export const TableBody = <T,>({
  rows,
  onRowClick,
  fixedRows = 10
}: TableBodyProps<T>) => {
  return (
    <TableBodyUI>
      {rows.map((row, idx) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={cn(
            'bg-input/10',
            idx % 2 === 0 && 'bg-white',
            onRowClick && 'hover:bg-muted/50 cursor-pointer',
            idx === rows.length - 1 &&
              idx < fixedRows - 1 &&
              '!border-border !border-b'
          )}
          onClick={() => {
            const selection = window.getSelection()
            if (selection && selection.toString().length > 0) {
              return
            }
            onRowClick?.(row.original)
          }}
        >
          {row.getVisibleCells().map(cell => {
            const size = cell.column.getSize()
            const cellStyle = {
              width: `${size}px`,
              minWidth: `${size}px`,
              maxWidth: `${size}px`
            }

            if (cell.column.id === 'select') {
              return (
                <TableCell
                  key={cell.id}
                  className="px-4"
                  style={cellStyle}
                  onClick={e => e.stopPropagation()}
                >
                  <Checkbox
                    checked={row.getIsSelected()}
                    indeterminate={
                      row.getIsSomeSelected() && !row.getIsSelected()
                    }
                    onCheckedChange={value => row.toggleSelected(!!value)}
                    aria-label="Select row"
                  />
                </TableCell>
              )
            }
            const cellContent = flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )
            return (
              <TableCell
                key={cell.id}
                className="px-4"
                style={cellStyle}
                title={cellContent as string}
              >
                <div className="truncate">{cellContent}</div>
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBodyUI>
  )
}

TableBody.displayName = 'TableBody'
