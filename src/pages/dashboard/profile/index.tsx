import { Link } from 'react-router-dom'

import { ProfileAccountConfigs } from '@/components/profile/AccountConfigs'
import { ProfileMainInfos } from '@/components/profile/MainInfos'

export default function Profile() {
  return (
    <div className="flex w-full flex-col gap-6">
      <ProfileMainInfos />

      <div className="flex w-full flex-row gap-6">
        <ProfileAccountConfigs />

        <Link
          to="/profile/change-password"
          className="flex-1 rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900">Alterar senha</h3>
          <p className="mt-2 text-sm text-gray-600">
            Altere sua senha de acesso.
          </p>
        </Link>
      </div>
    </div>
  )
}
