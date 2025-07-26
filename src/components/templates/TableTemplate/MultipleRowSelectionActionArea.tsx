import { ArchiveRestore, TrashIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { UserMutations } from '@/services/queries/user'
import { useModalStore } from '@/stores/useModalStore'

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
  const deleteUser = UserMutations.useDeleteUser()
  const { openModal } = useModalStore()

  const userIdsLength = useMemo(() => userIds.length, [userIds])

  const handleMoveUserToTrash = useCallback(() => {
    moveUserToTrash.mutate(userIds)
  }, [moveUserToTrash, userIds])

  const handleRestoreUserFromTrash = useCallback(() => {
    restoreUserFromTrash.mutate(userIds)
  }, [restoreUserFromTrash, userIds])

  const handleDeleteUser = useCallback(() => {
    const itemText = userIdsLength === 1 ? 'usuário' : 'usuários'
    openModal({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir ${userIdsLength} ${itemText}? Esta ação não pode ser desfeita.`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: () => deleteUser.mutate(userIds),
      isDestructive: true
    })
  }, [deleteUser, userIds, userIdsLength, openModal])

  const selectedItemsTitle = useMemo(() => {
    if (userIdsLength === 1) {
      return 'item selecionado'
    }
    return 'itens selecionados'
  }, [userIdsLength])

  return (
    <div className="flex items-center justify-between rounded-sm border bg-white px-4 py-2">
      <div>
        <p>
          <span className="font-medium">{userIdsLength}</span>{' '}
          {selectedItemsTitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {deleted ? (
          <div className="flex items-center gap-2">
            <Button
              variant="restore"
              size="sm"
              onClick={handleRestoreUserFromTrash}
            >
              <ArchiveRestore className="h-4 w-4" />
              Restaurar da lixeira
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteUser}
            >
              <TrashIcon className="h-4 w-4" />
              Excluir da lixeira
            </Button>
          </div>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleMoveUserToTrash}
          >
            <TrashIcon className="h-4 w-4" />
            Mover para lixeira
          </Button>
        )}
      </div>
    </div>
  )
}
