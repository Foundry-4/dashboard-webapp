import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface TableSkeletonProps {
  columnCount?: number
  rowCount?: number
  headerComponent?: React.ReactNode
}

export const TableSkeleton = ({
  columnCount = 10,
  rowCount = 5,
  headerComponent
}: TableSkeletonProps) => {
  return (
    <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 w-full overflow-x-auto rounded-md border">
      <div className="min-w-full">
        <Table>
          {headerComponent}
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="h-12"
                  >
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
