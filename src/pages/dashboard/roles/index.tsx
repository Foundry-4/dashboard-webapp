import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { RolesFilters } from '@/components/roles/Filters'
import { RolesTable } from '@/components/roles/Table'
import { Button } from '@/components/ui/button'

export default function Roles() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <RolesFilters />
        <Button
          className="self-end bg-gray-300 text-black hover:bg-gray-400"
          size="sm"
          onClick={() => {
            navigate('/users/create-user')
          }}
        >
          <PlusIcon className="h-4 w-4" />
          Criar permissão
        </Button>
      </div>
      <RolesTable />
    </div>
  )
}
