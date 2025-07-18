import { useQuery } from '@tanstack/react-query'

import { ProfileRefetchKeys } from '@/domain/constants/profile'
import { getProfileById } from '@/services/requests/profile/get-profile-by-id'
import { getProfiles } from '@/services/requests/profile/get-profiles'

export const useGetProfiles = () => {
  return useQuery({
    queryKey: [ProfileRefetchKeys.PROFILES],
    queryFn: getProfiles
  })
}

export const useGetProfileById = (userId: string) => {
  return useQuery({
    queryKey: [ProfileRefetchKeys.PROFILE, userId],
    queryFn: () => getProfileById(userId)
  })
}

export const ProfileQueries = {
  useGetProfileById,
  useGetProfiles
}
