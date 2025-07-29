import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { CompaniesFilters } from '@/components/companies/Filters'
import { CompaniesTable } from '@/components/companies/Table'
import { Button } from '@/components/ui/button'

export default function Companies() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <CompaniesFilters />
        <Button
          className="self-end bg-gray-300 text-black hover:bg-gray-400"
          size="sm"
          onClick={() => {
            navigate('/companies/create-company')
          }}
        >
          <PlusIcon className="h-4 w-4" />
          Criar empresa
        </Button>
      </div>
      <CompaniesTable />
    </div>
  )
}
