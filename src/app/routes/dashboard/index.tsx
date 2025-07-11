import { useAuth } from '@/contexts/AuthContext'
import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Dashboard - NaMesaJá' }]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {user?.name}!
        </h2>
        <p className="mt-2 text-gray-600">
          Este é o seu painel de controle do NaMesaJá.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Estatísticas</h3>
          <p className="mt-2 text-sm text-gray-600">
            Visualize suas estatísticas e métricas importantes.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Configurações</h3>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie suas configurações de conta e preferências.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Suporte</h3>
          <p className="mt-2 text-sm text-gray-600">
            Entre em contato com nossa equipe de suporte.
          </p>
        </div>
      </div>
    </div>
  )
}
