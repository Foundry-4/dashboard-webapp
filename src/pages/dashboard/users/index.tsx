import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { UsersFilters } from '@/components/users/Filters'
import { UsersTable } from '@/components/users/Table'

export default function Users() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <UsersFilters />
        <Button
          className="self-end bg-gray-300 text-black hover:bg-gray-400"
          size="sm"
          onClick={() => {
            navigate('/users/create-user')
          }}
        >
          <PlusIcon className="h-4 w-4" />
          Criar usuário
        </Button>
      </div>
      <UsersTable />
    </div>
  )
}
