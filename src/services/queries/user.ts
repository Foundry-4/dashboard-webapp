import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { AxiosError } from 'axios'

import { UserRefetchKeys } from '@/domain/constants/user'
import { createUser } from '@/services/requests/user/create-user'
import { getUserById } from '@/services/requests/user/get-user-by-id'
import { getUsers } from '@/services/requests/user/get-users'

export const useGetUsers = () => {
  return useQuery({
    queryKey: [UserRefetchKeys.USERS],
    queryFn: getUsers
  })
}

export const useGetUserById = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: [UserRefetchKeys.USER, userId],
    queryFn: () => getUserById(userId),
    enabled
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao criar usuário'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [UserRefetchKeys.USERS] })
    }
  })
}

export const UserQueries = {
  useGetUsers,
  useGetUserById
}

export const UserMutations = {
  useCreateUser
}
