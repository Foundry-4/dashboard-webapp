import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import { FormInput } from '@/components/ui/custom/FormInput'
import { loginSchema } from '@/domain/schemas/auth'
import { useAuth } from '@/hooks/useAuth'

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password
      })

      if (!response.status) {
        return setError('root', {
          type: 'manual',
          message: response.message
        })
      }

      if (!response.data.token) {
        return navigate('/verify-2fa')
      }

      return navigate('/')
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Erro ao fazer login.'
      })
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Acesse sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <FormInput
            label="Senha"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />

          <ErrorAlert error={errors.root?.message} />

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
