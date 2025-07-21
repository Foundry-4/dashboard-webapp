import type { User } from '@/domain/interfaces/user'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/date'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'userId',
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
    accessorKey: 'email',
    header: 'Email',
    size: 300,
    enableSorting: true
  },
  {
    accessorKey: 'roleName',
    header: 'Permissões',
    size: 150,
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
    accessorKey: 'accountConfirmed',
    header: 'Conta confirmada',
    size: 200,
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.accountConfirmed
      return (
        <Badge variant={value === 'S' ? 'outline' : 'destructive'}>
          {value === 'S' ? 'Sim' : 'Não'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'blocked',
    header: 'Bloqueado',
    size: 160,
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.blocked
      return (
        <Badge variant={value ? 'destructive' : 'outline'}>
          {value ? 'Sim' : 'Não'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'twoFactorEnabled',
    header: 'Autenticação de dois fatores',
    size: 250,
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.twoFactorEnabled
      return (
        <Badge variant={value ? 'outline' : 'destructive'}>
          {value ? 'Habilitado' : 'Desabilitado'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'deleted',
    header: 'Deletado',
    size: 100,
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.deleted
      return (
        <Badge variant={value ? 'destructive' : 'outline'}>
          {value ? 'Sim' : 'Não'}
        </Badge>
      )
    }
  }
]
