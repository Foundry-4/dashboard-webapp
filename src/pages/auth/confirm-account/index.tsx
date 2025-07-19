import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { AuthMutations } from '@/services/queries/auth'

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams()
  const userGuid = searchParams.get('user-guid')

  const hasConfirmed = useRef(false)
  const [message, setMessage] = useState('')

  const confirmAccount = AuthMutations.useConfirmAccount()

  const handleConfirmAccount = useCallback(
    async (userGuid: string) => {
      if (hasConfirmed.current) return
      hasConfirmed.current = true

      try {
        const response = await confirmAccount.mutateAsync({ userGuid })

        setMessage(response.message)
      } catch {
        setMessage('Você já confirmou sua conta.')
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

      {message && (
        <AuthFooter
          question={message}
          linkTo="/login"
          linkText="Faça login para continuar"
          hideSubmitButton
        />
      )}
    </CardHeader>
  )
}
