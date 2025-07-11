import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { type MetaFunction, useNavigate } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Criar conta - NaMesaJá' }]

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Crie sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-6"
        >
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nome</Label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
          </div>

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

          <AuthFooter
            question="Já possui conta?"
            linkText="Acessar conta"
            linkTo="/login"
            buttonText={isSubmitting ? 'Criando conta...' : 'Criar conta'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </>
  )
}
