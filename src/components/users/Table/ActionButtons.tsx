import { PencilIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface ActionButtonsProps {
  userId: number
}

export const ActionButtons = ({ userId }: ActionButtonsProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/users/edit-user/${userId}`)}
      >
        <PencilIcon className="h-4 w-4" />
        Editar
      </Button>
      <Button
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="h-4 w-4" />
        Excluir
      </Button>
    </div>
  )
}
