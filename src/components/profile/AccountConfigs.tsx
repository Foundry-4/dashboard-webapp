import { Switch2FA } from './Switch2FA'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileQueries } from '@/services/queries/profile'

export const ProfileAccountConfigs = () => {
  const userProfile = ProfileQueries.useGetProfile()
  const is2FAEnabled = userProfile.data?.twoFactorEnabled

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de conta</CardTitle>
      </CardHeader>
      <CardContent>
        <Switch2FA
          is2FAEnabled={is2FAEnabled}
          isLoading={userProfile.isLoading}
        />
      </CardContent>
    </Card>
  )
}
