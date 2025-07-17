import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import { FormInput } from '@/components/ui/custom/FormInput'
import { MessageAlert } from '@/components/ui/custom/MessageAlert'
import { useAuth } from '@/contexts/AuthContext'
import { changePasswordSchema } from '@/domain/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function ChangePassword() {
  const { user, changePassword } = useAuth()
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await changePassword({
        userGuid: user?.userGuid ?? '',
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      })

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
      console.error('Change password error:', err)
      setError('root', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Erro ao alterar senha.'
      })
    }
  }

  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-4xl">Alterar senha</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormInput
            label="Senha atual *"
            type="password"
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />

          <FormInput
            label="Nova senha"
            type="password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />

          <FormInput
            label="Confirmar nova senha"
            type="password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <ErrorAlert error={errors.root?.message} />

          <MessageAlert message={message} />

          <AuthFooter
            question="Não lembra sua senha atual?"
            linkText="Solicitar nova senha"
            linkTo="/forgot-password"
            buttonText={isSubmitting ? 'Alterando...' : 'Alterar senha'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </div>
  )
}
