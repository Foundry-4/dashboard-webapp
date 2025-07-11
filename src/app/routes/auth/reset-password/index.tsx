import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { type MetaFunction, useSearchParams } from 'react-router'

export const meta: MetaFunction = () => [
  { title: 'Redefinir senha - NaMesaJá' }
]

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { resetPassword } = useAuth()

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      setError('Token de redefinição inválido.')
      return
    }

    if (!password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await resetPassword(token, password)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao redefinir senha.')
    } finally {
      setIsSubmitting(false)
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nova senha</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">
              Confirmar nova senha
            </Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
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
