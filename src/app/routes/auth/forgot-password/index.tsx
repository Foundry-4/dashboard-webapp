import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, type MetaFunction } from 'react-router'

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

        {!emailSent && (
          <Button
            className="h-10 w-full outline-none"
            onClick={handleSendEmail}
          >
            Redefinir senha
          </Button>
        )}

        <p className="text-center text-sm text-gray-500">
          Já possui conta?
          <Link
            to="/login"
            className="ml-1 text-sm"
          >
            Acessar conta
          </Link>
        </p>
      </CardContent>
    </>
  )
}
