import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { Company } from '@/domain/interfaces/company'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'companyId',
    header: 'ID',
    size: 80
  },
  {
    accessorKey: 'nameFantasy',
    header: 'Nome Fantasia',
    size: 200
  },
  {
    accessorKey: 'corporateName',
    header: 'Razão Social',
    size: 250
  },
  {
    accessorKey: 'cnpj',
    header: 'CNPJ',
    size: 150,
    cell: ({ row }) => {
      const cnpj = row.original.cnpj
      if (!cnpj) return '-'
      return cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      )
    }
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    size: 150
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200
  },
  {
    accessorKey: 'workingHoursWeek',
    header: 'Horário Semana',
    size: 150
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    size: 150,
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string
      return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR })
    }
  },
  {
    accessorKey: 'deleted',
    header: 'Status',
    size: 100,
    cell: ({ row }) => {
      const deleted = row.getValue('deleted') as boolean
      return (
        <Badge variant={deleted ? 'destructive' : 'default'}>
          {deleted ? 'Deletado' : 'Ativo'}
        </Badge>
      )
    }
  }
]
