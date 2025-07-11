import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => [
  { title: 'Redefinir senha - NaMesaJá' }
]

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)

  const handleSendEmail = () => {
    // TODO: Logic with api here
    setEmailSent(true)
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">
          Redefina sua senha
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {emailSent ? (
          <p className="text-center text-base text-gray-500">
            Verifique seu email para redefinir sua senha
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">Email</Label>
            <Input
              type="email"
              className="h-10 outline-none focus-visible:ring-0"
            />
          </div>
        )}

        <AuthFooter
          question="Já possui conta?"
          linkText="Acessar conta"
          linkTo="/login"
          isButtonDisabled={emailSent}
          buttonText="Redefinir senha"
          onSubmit={handleSendEmail}
        />
      </CardContent>
    </>
  )
}
