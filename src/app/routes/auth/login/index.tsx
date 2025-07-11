import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { type MetaFunction, Link, useLocation, useNavigate } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Login - NaMesaJá' }]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Acesse sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleLogin}
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

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
          </div>

          <Link
            to="/forgot-password"
            className="ml-auto text-sm !text-orange-600"
          >
            Esqueci minha senha
          </Link>

          <AuthFooter
            question="Não possui conta?"
            linkText="Criar conta"
            linkTo="/register"
            buttonText={isSubmitting ? 'Entrando...' : 'Entrar'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </>
  )
}
