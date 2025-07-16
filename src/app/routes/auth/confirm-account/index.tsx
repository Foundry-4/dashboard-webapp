import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthMutations } from '@/services/queries/auth'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { AuthFooter } from '../../../../components/auth/AuthFooter'

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams()
  const userGuid = searchParams.get('user-guid')
  const confirmAccount = AuthMutations.useConfirmAccount()
  const [message, setMessage] = useState('')
  const hasConfirmed = useRef(false)

  const handleConfirmAccount = useCallback(
    async (userGuid: string) => {
      if (hasConfirmed.current) return
      hasConfirmed.current = true

      try {
        const response = await confirmAccount.mutateAsync({ userGuid })
        setMessage(response.message)
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Erro ao confirmar conta.'
        )
      }
    },
    [confirmAccount]
  )

  useEffect(() => {
    if (userGuid && !hasConfirmed.current) {
      handleConfirmAccount(userGuid)
    }
  }, [userGuid, handleConfirmAccount])

  return (
    <CardHeader className="flex flex-col items-center gap-4">
      <CardTitle className="text-center text-4xl">
        Confirmação de conta
      </CardTitle>

      <CardDescription className="text-center text-sm text-gray-500">
        {message}
      </CardDescription>

      <AuthFooter
        question="Conta confirmada?"
        linkTo="/login"
        linkText="Faça login para continuar"
      />
    </CardHeader>
  )
}
