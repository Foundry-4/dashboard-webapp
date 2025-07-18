import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getMeProfile } from '@/services/requests/settings/get-me-infos'
import { update2FA } from '@/services/requests/settings/update-2fa'

export const useGetMeProfile = () => {
  return useQuery({
    queryKey: ['me-profile'],
    queryFn: getMeProfile
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
    onError: (error: AxiosError, _, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProfile) {
        queryClient.setQueryData(['me-profile'], context.previousProfile)
      }
      console.log(error)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['me-profile'] })
    }
  })
}

export const SettingsQueries = {
  useGetMeProfile
}

export const SettingsMutations = {
  useUpdate2FA
}
