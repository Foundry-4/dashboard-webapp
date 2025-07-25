import { ArchiveRestore, TrashIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { UserMutations } from '@/services/queries/user'

interface MultipleRowSelectionActionAreaProps {
  userIds: number[]
  deleted?: boolean
}

export function MultipleRowSelectionActionArea({
  userIds,
  deleted
}: MultipleRowSelectionActionAreaProps) {
  const moveUserToTrash = UserMutations.useMoveUserToTrash()
  const restoreUserFromTrash = UserMutations.useRestoreUserFromTrash()

  const handleMoveUserToTrash = useCallback(() => {
    moveUserToTrash.mutate(userIds)
  }, [moveUserToTrash, userIds])

  const handleRestoreUserFromTrash = useCallback(() => {
    restoreUserFromTrash.mutate(userIds)
  }, [restoreUserFromTrash, userIds])

  const handleSelectedItemsTitle = useMemo(() => {
    if (userIds.length === 1) {
      return 'item selecionado'
    }
    return 'itens selecionados'
  }, [userIds])

  return (
    <div className="flex items-center justify-between rounded-sm border bg-white px-4 py-2">
      <div>
        <p>
          <span className="font-medium">{userIds.length}</span>{' '}
          {handleSelectedItemsTitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {deleted ? (
          <Button
            variant="restore"
            size="sm"
            onClick={handleRestoreUserFromTrash}
          >
            <ArchiveRestore className="h-4 w-4" />
            Restaurar
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleMoveUserToTrash}
          >
            <TrashIcon className="h-4 w-4" />
            Excluir
          </Button>
        )}
      </div>
    </div>
  )
}
