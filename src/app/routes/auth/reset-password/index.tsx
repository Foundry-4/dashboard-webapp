import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type MetaFunction, useSearchParams } from 'react-router'
import { z } from 'zod'

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
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
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nova senha</Label>
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
              Confirmar nova senha
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
