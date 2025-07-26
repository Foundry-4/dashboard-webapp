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
  fixedRows,
  onRowClick
}: TableBodyProps<T>) => {
  const emptyRowsCount =
    fixedRows && rows.length < fixedRows ? fixedRows - rows.length : 0
  const cellsPerRow = rows[0]?.getVisibleCells().length ?? 1

  return (
    <TableBodyUI>
      {rows.map((row, idx) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={cn(
            'bg-input/10',
            idx % 2 === 0 && 'bg-white',
            onRowClick && 'hover:bg-muted/50 cursor-pointer'
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
      {/* Render empty rows if needed */}
      {Array.from({ length: emptyRowsCount }).map((_, idx) => (
        <TableRow
          key={`empty-row-${idx}`}
          className={cn(
            'bg-input/10 h-[49px]',
            (rows.length + idx) % 2 === 0 && 'bg-white'
          )}
        >
          {Array.from({ length: cellsPerRow }).map((_, cellIdx) => {
            // Get the size from the corresponding column in the first row
            const correspondingCell = rows[0]?.getVisibleCells()[cellIdx]
            const size = correspondingCell?.column.getSize() ?? 100
            const cellStyle = {
              width: `${size}px`,
              minWidth: `${size}px`,
              maxWidth: `${size}px`
            }

            return (
              <TableCell
                key={`empty-cell-${cellIdx}`}
                className="px-4"
                style={cellStyle}
              >
                {/* Empty cell */}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </TableBodyUI>
  )
}

TableBody.displayName = 'TableBody'
