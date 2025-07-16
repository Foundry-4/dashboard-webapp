import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type MetaFunction } from 'react-router'
import { z } from 'zod'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*]/,
        'Senha deve conter pelo menos um caractere especial'
      ),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(/[!@#$%^&*]/, 'Senha deve conter pelo menos um caractere especial')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export const meta: MetaFunction = () => [{ title: 'Alterar senha - NaMesaJá' }]

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
      const response = await changePassword(
        user?.userGuid ?? '',
        data.currentPassword,
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
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Senha atual *</Label>
            <Input
              type="password"
              {...register('currentPassword')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.currentPassword && (
              <span className="text-sm text-red-600">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nova senha *</Label>
            <Input
              type="password"
              {...register('newPassword')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.newPassword && (
              <span className="text-sm text-red-600">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">
              Confirmar nova senha *
            </Label>
            <Input
              type="password"
              {...register('confirmPassword')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {errors.root && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
              {message}
            </div>
          )}

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
