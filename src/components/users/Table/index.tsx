import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { User } from '@/domain/interfaces/user'

import { TableTemplate } from '@/components/common/TableTemplate/index'
import { Button } from '@/components/ui/button'
import { columns } from '@/components/users/Table/columns'
import { UserQueries } from '@/services/queries/user'

export const UsersTable = () => {
  const navigate = useNavigate()
  const users = UserQueries.useGetUsers()

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="self-end bg-orange-300 text-black hover:bg-orange-400"
        size="sm"
        onClick={() => {
          navigate('/users/create-user')
        }}
      >
        <PlusIcon className="h-4 w-4" />
        Criar usuário
      </Button>
      <TableTemplate<User>
        data={users.data?.data?.data || []}
        isLoading={users.isLoading}
        columns={columns}
      />
    </div>
  )
}
