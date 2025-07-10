import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type MetaFunction, Link } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Login - NaMesaJá' }]

export default function Login() {
  const handleLogin = () => {
    // TODO: Logic with api here
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-4xl">Acesse sua conta</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
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

        <Link
          to="/forgot-password"
          className="ml-auto text-sm"
        >
          Esqueci minha senha
        </Link>

        <Button
          className="h-10 w-full outline-none"
          onClick={handleLogin}
        >
          Entrar
        </Button>

        <p className="text-center text-sm text-gray-500">
          Não possui conta?
          <Link
            to="/register"
            className="ml-1 text-sm"
          >
            Criar conta
          </Link>
        </p>
      </CardContent>
    </>
  )
}
