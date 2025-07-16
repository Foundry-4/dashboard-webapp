import { AuthFooter } from '@/components/auth/AuthFooter'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type MetaFunction } from 'react-router'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const meta: MetaFunction = () => [
  { title: 'Esqueci minha senha - NaMesaJá' }
]

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data.email)
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
      console.error('Forgot password error:', err)
      setError('root', {
        type: 'manual',
        message:
          err instanceof Error
            ? err.message
            : 'Erro ao enviar email de recuperação.'
      })
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">
          {message ? 'Email enviado!' : 'Esqueci minha senha'}
        </CardTitle>

        {!message && (
          <CardDescription>
            Digite seu email e enviaremos instruções para redefinir sua senha.
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Email</Label>
            <Input
              type="email"
              {...register('email')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
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
            buttonText={isSubmitting ? 'Enviando...' : 'Enviar email'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </>
  )
}
