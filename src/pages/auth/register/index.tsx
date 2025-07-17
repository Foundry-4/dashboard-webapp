import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import { FormInput } from '@/components/ui/custom/FormInput'
import { MessageAlert } from '@/components/ui/custom/MessageAlert'
import { useAuth } from '@/contexts/AuthContext'
import { registerSchema } from '@/domain/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof registerSchema>

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
      const response = await registerUser({
        name: data.name,
        email: data.email,
        confirmEmail: data.confirmEmail,
        password: data.password
      })

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
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Nome *"
            type="text"
            error={errors.name?.message}
            {...register('name')}
          />

          <FormInput
            label="Email *"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <FormInput
            label="Confirmar email *"
            type="email"
            error={errors.confirmEmail?.message}
            {...register('confirmEmail')}
          />

          <FormInput
            label="Senha *"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />

          <ErrorAlert error={errors.root?.message} />
          <MessageAlert message={message} />

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
