import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { getProfile } from '@/services/requests/profile/get-profile'
import { update2FA } from '@/services/requests/profile/update-2fa'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['me-profile'],
    queryFn: getProfile
  })
}

export const useUpdate2FA = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: update2FA,
    onMutate: async ({ enabled }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['me-profile'] })

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(['me-profile'])

      // Optimistically update to the new value
      queryClient.setQueryData(['me-profile'], (old: unknown) => {
        const oldData = old as { twoFactorEnabled?: boolean }
        return {
          ...oldData,
          twoFactorEnabled: enabled
        }
      })

      // Return a context object with the snapshotted value
      return { previousProfile }
    },
    onSuccess: response => {
      // Show success message from server response
      toast.success(response.message || '2FA atualizado com sucesso.')
    },
    onError: (error: AxiosError, _, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProfile) {
        queryClient.setQueryData(['me-profile'], context.previousProfile)
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao atualizar 2FA. Tente novamente.'
      )
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['me-profile'] })
    }
  })
}

export const ProfileQueries = {
  useGetProfile
}

export const ProfileMutations = {
  useUpdate2FA
}
