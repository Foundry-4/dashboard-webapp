import { AuthFooter } from '@/components/auth/AuthFooter'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import { FormInput } from '@/components/ui/custom/FormInput'
import { MessageAlert } from '@/components/ui/custom/MessageAlert'
import { useAuth } from '@/contexts/AuthContext'
import { forgotPasswordSchema } from '@/domain/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type MetaFunction } from 'react-router'
import { z } from 'zod'

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
      const response = await forgotPassword({ email: data.email })
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
          <FormInput
            label="Email *"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <ErrorAlert error={errors.root?.message} />
          <MessageAlert message={message} />

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
