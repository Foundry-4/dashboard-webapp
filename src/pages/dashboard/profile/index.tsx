import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1>Profile</h1>

      <Link
        to="/profile/change-password"
        className="rounded-lg bg-white p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900">Alterar senha</h3>
        <p className="mt-2 text-sm text-gray-600">
          Altere sua senha de acesso.
        </p>
      </Link>
    </div>
  )
}
