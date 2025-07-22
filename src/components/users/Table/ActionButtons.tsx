import { PencilIcon, TrashIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { UserMutations } from '@/services/queries/user'

interface ActionButtonsProps {
  userId: number
  isDeleted: boolean
}

export const ActionButtons = ({ userId, isDeleted }: ActionButtonsProps) => {
  const navigate = useNavigate()
  const moveUserToTrash = UserMutations.useMoveUserToTrash()
  const restoreUserFromTrash = UserMutations.useRestoreUserFromTrash()

  const handleMoveUserToTrash = useCallback(() => {
    moveUserToTrash.mutate(userId)
  }, [moveUserToTrash, userId])

  const handleRestoreUserFromTrash = useCallback(() => {
    restoreUserFromTrash.mutate(userId)
  }, [restoreUserFromTrash, userId])

  const isDeletedCase = useMemo(() => {
    if (isDeleted) {
      return {
        onClick: handleRestoreUserFromTrash,
        label: 'Restaurar',
        icon: <TrashIcon className="h-4 w-4" />
      }
    }

    return {
      onClick: handleMoveUserToTrash,
      label: 'Mover para lixeira',
      icon: <TrashIcon className="h-4 w-4" />
    }
  }, [isDeleted, handleMoveUserToTrash, handleRestoreUserFromTrash])

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
        onClick={isDeletedCase.onClick}
      >
        {isDeletedCase.icon}
        {isDeletedCase.label}
      </Button>
    </div>
  )
}
