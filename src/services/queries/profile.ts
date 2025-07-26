import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { ProfileRefetchKeys } from '@/domain/constants/profile'
import { baseURL } from '@/services/api'
import { deleteAvatar } from '@/services/requests/profile/delete-avatar'
import { getProfile } from '@/services/requests/profile/get-profile'
import { update2FA } from '@/services/requests/profile/update-2fa'
import { updateAvatar } from '@/services/requests/profile/update-avatar'
import { updateTheme } from '@/services/requests/profile/update-theme'

export const useGetProfile = () => {
  return useQuery({
    queryKey: [ProfileRefetchKeys.PROFILE],
    queryFn: getProfile,
    enabled: !!JSON.parse(localStorage.getItem('na-mesa-ja:user') || 'null')
      ?.token,
    select: data => ({
      ...data,
      profilePictureUrl: `${baseURL}${data.profilePictureUrl}`
    })
  })
}

export const useUpdate2FA = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: update2FA,
    onMutate: async ({ enabled }) => {
      await queryClient.cancelQueries({
        queryKey: [ProfileRefetchKeys.PROFILE]
      })
      const previousProfile = queryClient.getQueryData([
        ProfileRefetchKeys.PROFILE
      ])

      queryClient.setQueryData([ProfileRefetchKeys.PROFILE], (old: unknown) => {
        const oldData = old as { twoFactorEnabled?: boolean }
        return {
          ...oldData,
          twoFactorEnabled: enabled
        }
      })

      return { previousProfile }
    },
    onSuccess: response => {
      toast.success(response.message || '2FA atualizado com sucesso.')
    },
    onError: (error: AxiosError, _, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          [ProfileRefetchKeys.PROFILE],
          context.previousProfile
        )
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao atualizar 2FA. Tente novamente.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProfileRefetchKeys.PROFILE] })
    }
  })
}

export const useUpdateTheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTheme,
    onMutate: async ({ darkTheme }) => {
      await queryClient.cancelQueries({
        queryKey: [ProfileRefetchKeys.PROFILE]
      })
      const previousProfile = queryClient.getQueryData([
        ProfileRefetchKeys.PROFILE
      ])

      queryClient.setQueryData([ProfileRefetchKeys.PROFILE], (old: unknown) => {
        const oldData = old as { darkTheme?: boolean }
        return {
          ...oldData,
          darkTheme
        }
      })

      return { previousProfile }
    },
    onSuccess: response => {
      toast.success(response.message || 'Tema atualizado com sucesso.')
    },
    onError: (error: AxiosError, _, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          [ProfileRefetchKeys.PROFILE],
          context.previousProfile
        )
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao atualizar tema. Tente novamente.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProfileRefetchKeys.PROFILE] })
    }
  })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: response => {
      toast.success(
        response.message || 'Foto de perfil atualizado com sucesso.'
      )
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao atualizar avatar. Tente novamente.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProfileRefetchKeys.PROFILE] })
    }
  })
}

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAvatar,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [ProfileRefetchKeys.PROFILE]
      })
      const previousProfile = queryClient.getQueryData([
        ProfileRefetchKeys.PROFILE
      ])

      queryClient.setQueryData([ProfileRefetchKeys.PROFILE], (old: unknown) => {
        const oldData = old as { profilePictureUrl?: string }
        return {
          ...oldData,
          profilePictureUrl: null
        }
      })

      return { previousProfile }
    },
    onSuccess: response => {
      if (!response.data.status) {
        return toast.error(
          response.data.message || 'Foto de perfil não encontrada.'
        )
      }

      toast.success(
        response.data.message || 'Foto de perfil removida com sucesso.'
      )
    },
    onError: (error: AxiosError, _, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          [ProfileRefetchKeys.PROFILE],
          context.previousProfile
        )
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao remover foto de perfil. Tente novamente.'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ProfileRefetchKeys.PROFILE] })
    }
  })
}

export const ProfileQueries = {
  useGetProfile
}

export const ProfileMutations = {
  useUpdate2FA,
  useUpdateTheme,
  useUpdateAvatar,
  useDeleteAvatar
}
