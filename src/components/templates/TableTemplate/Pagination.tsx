import { useMemo } from 'react'

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
}

export const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange
}: TablePaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const getVisiblePages = () => {
    // If there's only one page, return just [1]
    if (totalPages <= 1) {
      return [1]
    }

    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handlePageIndicator = useMemo(() => {
    if (totalItems === 0) {
      return 'Nenhum resultado encontrado'
    } else if (totalItems === 1) {
      return 'Mostrando 1 resultado'
    } else if (startItem === endItem) {
      return `Mostrando ${1} de ${totalItems} resultados`
    } else {
      return `Mostrando ${startItem} a ${endItem} de ${totalItems} resultados`
    }
  }, [totalItems, startItem, endItem])

  return (
    <div className={`flex items-center justify-between px-4 py-2 ${className}`}>
      <div className="text-muted-foreground text-sm whitespace-nowrap">
        {handlePageIndicator}
      </div>
      <div className="flex items-center gap-2">
        <PaginationRoot className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault()
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1)
                  }
                }}
                className={cn(
                  '!text-black',
                  currentPage <= 1 && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>

            {getVisiblePages().map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      onPageChange(page as number)
                    }}
                    isActive={currentPage === page}
                    className="!border-orange-300 !text-orange-500"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault()
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1)
                  }
                }}
                className={cn(
                  '!text-black',
                  currentPage >= totalPages && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationRoot>
        <Select
          value={String(pageSize)}
          onValueChange={value =>
            onPageSizeChange && onPageSizeChange(Number(value))
          }
        >
          <SelectTrigger className="!h-8 !gap-1 !p-2">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent
            className={cn(
              '!max-w-16 !min-w-16 [&_svg]:hidden',
              pageSize !== 100 && '!max-w-[53.02px] !min-w-[53.02px]'
            )}
          >
            {pageSizeOptions.map(option => (
              <SelectItem
                key={option}
                value={String(option)}
                className="cursor-pointer"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
