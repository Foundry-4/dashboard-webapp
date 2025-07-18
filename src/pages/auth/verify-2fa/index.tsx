import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AuthFooter } from '@/components/auth/AuthFooter'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ErrorAlert } from '@/components/ui/custom/ErrorAlert'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { verify2FASchema } from '@/domain/schemas/auth'
import { useAuth } from '@/hooks/useAuth'

type Verify2FAFormData = z.infer<typeof verify2FASchema>

export default function Verify2FA() {
  const { verify2FA } = useAuth()
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError
  } = useForm<Verify2FAFormData>({
    resolver: zodResolver(verify2FASchema),
    defaultValues: {
      otp: ''
    }
  })

  const otpValue = watch('otp')

  const onSubmit = async (data: Verify2FAFormData) => {
    try {
      const response = await verify2FA({ twoFactorCode: data.otp })

      if (!response.status) {
        return setError('root', {
          type: 'manual',
          message: response.message
        })
      }
    } catch (err) {
      console.error('2FA verification error:', err)
      setError('root', {
        type: 'manual',
        message:
          err instanceof Error ? err.message : 'Erro ao verificar código.'
      })
    }
  }

  return (
    <CardHeader className="flex flex-col items-center gap-4">
      <CardTitle className="text-center text-4xl">
        Código de verificação
      </CardTitle>
      <CardDescription className="text-center text-sm text-gray-500">
        Digite o código de verificação enviado para o seu email
      </CardDescription>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-center">
              <InputOTP
                value={otpValue}
                onChange={value => setValue('otp', value)}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && (
              <span className="text-center text-sm text-red-600">
                {errors.otp.message}
              </span>
            )}
          </div>

          <ErrorAlert error={errors.root?.message} />

          <AuthFooter
            question="Não recebeu o código?"
            linkText="Enviar novamente"
            linkTo="/verify-2fa"
            buttonText={isSubmitting ? 'Verificando...' : 'Verificar código'}
            disabled={isSubmitting}
          />
        </form>
      </CardContent>
    </CardHeader>
  )
}
