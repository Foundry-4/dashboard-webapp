import { useQuery } from '@tanstack/react-query'

import { UserRefetchKeys } from '@/domain/constants/user'
import { getUserById } from '@/services/requests/user/get-user-by-id'
import { getUsers } from '@/services/requests/user/get-users'

export const useGetUsers = () => {
  return useQuery({
    queryKey: [UserRefetchKeys.USERS],
    queryFn: getUsers
  })
}

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [UserRefetchKeys.USER, userId],
    queryFn: () => getUserById(userId)
  })
}

export const UserQueries = {
  useGetUsers,
  useGetUserById
}
