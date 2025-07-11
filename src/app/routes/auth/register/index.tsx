import { AuthFooter } from '@/components/auth/AuthFooter'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type MetaFunction, useNavigate } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Criar conta - NaMesaJá' }]

export default function Register() {
  const navigate = useNavigate()

  const handleRegister = () => {
    // TODO: Logic with api here
    navigate('/login')
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Crie sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-gray-500">Nome</Label>
          <Input
            type="text"
            className="h-10 outline-none focus-visible:ring-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-gray-500">Email</Label>
          <Input
            type="email"
            className="h-10 outline-none focus-visible:ring-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-gray-500">Senha</Label>
          <Input
            type="password"
            className="h-10 outline-none focus-visible:ring-0"
          />
        </div>

        <AuthFooter
          question="Já possui conta?"
          linkText="Acessar conta"
          linkTo="/login"
          buttonText="Criar conta"
          onSubmit={handleRegister}
        />
      </CardContent>
    </>
  )
}
