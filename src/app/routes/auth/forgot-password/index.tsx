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
import { useState } from 'react'
import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => [
  { title: 'Esqueci minha senha - NaMesaJá' }
]

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { forgotPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Por favor, insira seu email.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao enviar email de recuperação.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-center text-4xl">Email enviado!</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
            Enviamos um email com instruções para redefinir sua senha.
          </div>

          <AuthFooter
            question="Lembrou sua senha?"
            linkText="Fazer login"
            linkTo="/login"
            buttonText="Voltar ao login"
            disabled={false}
          />
        </CardContent>
      </>
    )
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">
          Esqueci minha senha
        </CardTitle>
        <CardDescription>
          Digite seu email e enviaremos instruções para redefinir sua senha.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
          </div>

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
