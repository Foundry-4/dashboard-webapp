import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthMutations } from '@/services/queries/auth'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export default function ConfirmAccount() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const userGuid = searchParams.get('user-guid')
  const confirmAccount = AuthMutations.useConfirmAccount()
  const [message, setMessage] = useState('')

  const handleConfirmAccount = useCallback(
    async (userGuid: string) => {
      try {
        const response = await confirmAccount.mutateAsync({ userGuid })
        setMessage(response.message)
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Erro ao confirmar conta.'
        )
      }
    },
    [confirmAccount, navigate]
  )

  useEffect(() => {
    if (userGuid && !hasConfirmed) {
      setHasConfirmed(true)
      handleConfirmAccount(userGuid)
    }
  }, [userGuid, confirmAccount, hasConfirmed, handleConfirmAccount])

  return (
    <CardHeader className="flex flex-col items-center gap-4">
      <CardTitle className="text-center text-4xl">
        Confirmação de conta
      </CardTitle>

      <CardDescription className="text-center text-sm text-gray-500">
        {message}
      </CardDescription>
    </CardHeader>
  )
}
