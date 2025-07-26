import type { User } from '@/domain/interfaces/user'
import type { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { baseURL } from '@/services/api'
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
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.name
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={`${baseURL}${row.original.profilePictureUrl}`}
              className="object-cover"
            />
            <AvatarFallback>{value?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="truncate">{value}</p>
        </div>
      )
    }
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
        <Badge variant={value === 'S' ? 'primary' : 'gray'}>
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
        <Badge variant={value ? 'destructive' : 'primary'}>
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
        <Badge variant={value ? 'primary' : 'gray'}>
          {value ? 'Habilitado' : 'Desabilitado'}
        </Badge>
      )
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
