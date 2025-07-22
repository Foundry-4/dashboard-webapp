import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { User } from '@/domain/interfaces/user'
import type { AxiosError } from 'axios'

import { UserRefetchKeys } from '@/domain/constants/user'
import { createUser } from '@/services/requests/user/create-user'
import { getUserById } from '@/services/requests/user/get-user-by-id'
import { getUsers } from '@/services/requests/user/get-users'
import { moveUserToTrash } from '@/services/requests/user/move-user-to-trash'
import { restoreUserFromTrash } from '@/services/requests/user/restore-user-from-trash'

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

export const useMoveUserToTrash = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moveUserToTrash,
    onMutate: async (userId: number) => {
      await queryClient.cancelQueries({ queryKey: [UserRefetchKeys.USERS] })
      const previousUsers = queryClient.getQueryData<
        ApiResponseWithPagination<User[]>
      >([UserRefetchKeys.USERS])
      if (previousUsers) {
        queryClient.setQueryData<ApiResponseWithPagination<User[]>>(
          [UserRefetchKeys.USERS],
          {
            ...previousUsers,
            data: {
              ...previousUsers.data,
              data: previousUsers.data.data.map(user =>
                user.userId === userId ? { ...user, deleted: true } : user
              )
            }
          }
        )
      }
      return { previousUsers }
    },
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError, _userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData([UserRefetchKeys.USERS], context.previousUsers)
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao mover usuário para lixeira'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [UserRefetchKeys.USERS] })
    }
  })
}

export const useRestoreUserFromTrash = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restoreUserFromTrash,
    onMutate: async (userId: number) => {
      await queryClient.cancelQueries({ queryKey: [UserRefetchKeys.USERS] })
      const previousUsers = queryClient.getQueryData<
        ApiResponseWithPagination<User[]>
      >([UserRefetchKeys.USERS])
      if (previousUsers) {
        queryClient.setQueryData<ApiResponseWithPagination<User[]>>(
          [UserRefetchKeys.USERS],
          {
            ...previousUsers,
            data: {
              ...previousUsers.data,
              data: previousUsers.data.data.map(user =>
                user.userId === userId ? { ...user, deleted: false } : user
              )
            }
          }
        )
      }
      return { previousUsers }
    },
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError, _userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData([UserRefetchKeys.USERS], context.previousUsers)
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao restaurar usuário'
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
  useCreateUser,
  useMoveUserToTrash,
  useRestoreUserFromTrash
}
