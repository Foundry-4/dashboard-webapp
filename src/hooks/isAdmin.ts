import { ProfileQueries } from '@/services/queries/profile'

export const useIsAdmin = () => {
  const profile = ProfileQueries.useGetProfile()

  return profile.data?.roleName === 'Super-Admin'
}
