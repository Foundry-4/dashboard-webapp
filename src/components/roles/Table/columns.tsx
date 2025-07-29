import type { RolesResponse } from '@/domain/interfaces/roles'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/date'

export const columns: ColumnDef<RolesResponse>[] = [
  {
    accessorKey: 'roleId',
    header: 'ID',
    size: 100,
    enableSorting: true
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    size: 300,
    enableSorting: true
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    size: 200,
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as string
      return formatDate(value)
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
    size: 200,
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as string
      return formatDate(value)
    }
  },
  {
    accessorKey: 'deleted',
    header: 'Deletado',
    size: 150,
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.deleted
      return (
        <Badge variant={value ? 'destructive' : 'primary'}>
          {value ? 'Sim' : 'Não'}
        </Badge>
      )
    }
  }
]
