import { AvatarUpload } from './AvatarUpload'

import { Card, CardContent } from '@/components/ui/card'
import { baseURL } from '@/services/api'
import { ProfileQueries } from '@/services/queries/profile'

export const ProfileMainInfos = () => {
  const userProfile = ProfileQueries.useGetProfile()
  const profilePictureUrl = `${baseURL}${userProfile.data?.profilePictureUrl}`

  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-4">
        <AvatarUpload
          currentAvatar={profilePictureUrl}
          userName={userProfile.data?.name}
        />
        <div>
          <p className="text-lg font-semibold">{userProfile.data?.name}</p>
          <p className="text-muted-foreground text-sm">
            {userProfile.data?.email}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
