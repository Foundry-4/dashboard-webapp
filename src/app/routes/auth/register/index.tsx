import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, type MetaFunction, useNavigate } from 'react-router'

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

        <Button
          className="h-10 w-full outline-none"
          onClick={handleRegister}
        >
          Criar conta
        </Button>

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
