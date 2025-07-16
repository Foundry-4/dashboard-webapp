import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import { FormInput } from '@/components/ui/custom/FormInput'
import { MessageAlert } from '@/components/ui/custom/MessageAlert'
import { useAuth } from '@/contexts/AuthContext'
import { resetPasswordSchema } from '@/domain/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type MetaFunction, useSearchParams } from 'react-router'
import { z } from 'zod'

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const meta: MetaFunction = () => [
  { title: 'Redefinir senha - NaMesaJá' }
]

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [message, setMessage] = useState('')
  const [searchParams] = useSearchParams()
  const userGuid = searchParams.get('user-guid')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await resetPassword(
        userGuid ?? '',
        data.newPassword,
        data.confirmPassword
      )

      if (!response.status) {
        setMessage('')
        setError('root', {
          type: 'manual',
          message: response.message
        })
        return
      }

      setMessage(response.message)
    } catch (err) {
      console.error('Reset password error:', err)
      setError('root', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Erro ao redefinir senha.'
      })
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Redefinir senha</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormInput
            label="Nova senha *"
            type="password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />

          <FormInput
            label="Confirmar nova senha *"
            type="password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <ErrorAlert error={errors.root?.message} />
          <MessageAlert message={message} />

          <AuthFooter
            question="Lembrou sua senha?"
            linkText="Fazer login"
            linkTo="/login"
            buttonText={isSubmitting ? 'Redefinindo...' : 'Redefinir senha'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </>
  )
}
