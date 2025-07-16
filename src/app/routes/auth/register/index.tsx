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

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    confirmEmail: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
      .regex(/[!@#$%^&*]/, 'Senha deve conter pelo menos um caractere especial')
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'Emails não coincidem',
    path: ['confirmEmail']
  })

type RegisterFormData = z.infer<typeof registerSchema>

export const meta: MetaFunction = () => [{ title: 'Criar conta - NaMesaJá' }]

export default function Register() {
  const { register: registerUser } = useAuth()
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      confirmEmail: '',
      password: ''
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(
        data.name,
        data.email,
        data.confirmEmail,
        data.password
      )

      if (!response.status) {
        setMessage('')
        return setError('root', {
          type: 'manual',
          message: response.message
        })
      }
      setMessage(response.message)
    } catch (err) {
      console.error('Registration error:', err)
      setError('root', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'Erro ao criar conta.'
      })
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Crie sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Nome</Label>
            <Input
              type="text"
              {...register('name')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>

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

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Confirmar email</Label>
            <Input
              type="email"
              {...register('confirmEmail')}
              className="h-10 outline-none focus-visible:ring-0"
              disabled={isSubmitting}
            />
            {errors.confirmEmail && (
              <span className="text-sm text-red-600">
                {errors.confirmEmail.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Senha</Label>
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
