import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ProfileQueries } from '@/services/queries/profile'

export const ProfileMainInfos = () => {
  const userProfile = ProfileQueries.useGetProfile()

  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={userProfile.data?.avatar} />
          <AvatarFallback>{userProfile.data?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
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
