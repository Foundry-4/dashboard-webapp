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
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const meta: MetaFunction = () => [
  { title: 'Redefinir senha - NaMesaJá' }
]

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [success, setSuccess] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('root', {
        type: 'manual',
        message: 'Token de redefinição inválido.'
      })
      return
    }

    try {
      await resetPassword(token, data.password)
      setSuccess(true)
    } catch (err) {
      console.error('Reset password error:', err)
      setError('root', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Erro ao redefinir senha.'
      })
    }
  }

  if (success) {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            Senha redefinida!
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
            Sua senha foi redefinida com sucesso. Você pode fazer login agora.
          </div>

          <AuthFooter
            question="Pronto para fazer login?"
            linkText="Acessar conta"
            linkTo="/login"
            buttonText="Ir para login"
            disabled={false}
          />
        </CardContent>
      </>
    )
  }

  if (!token) {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-center text-4xl">Token inválido</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            O token de redefinição é inválido ou expirou.
          </div>

          <AuthFooter
            question="Precisa de ajuda?"
            linkText="Solicitar nova senha"
            linkTo="/forgot-password"
            buttonText="Solicitar nova senha"
            disabled={false}
          />
        </CardContent>
      </>
    )
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
          {errors.root && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nova senha</Label>
            <Input
              type="password"
              {...register('password')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
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
