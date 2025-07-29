import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteCompany } from '../requests/company/delete-company'

import type { ApiResponseWithPagination } from '@/domain/interfaces/apiResponse'
import type { Company, GetCompaniesParams } from '@/domain/interfaces/company'
import type { AxiosError } from 'axios'

import { CompanyRefetchKeys } from '@/domain/constants/company'
import { createCompany } from '@/services/requests/company/create-company'
import { getCompanies } from '@/services/requests/company/get-companies'
import { getCompanyById } from '@/services/requests/company/get-company-by-id'
import { moveCompanyToTrash } from '@/services/requests/company/move-company-to-trash'
import { restoreCompanyFromTrash } from '@/services/requests/company/restore-company-from-trash'
import { updateCompany } from '@/services/requests/company/update-company'

export const useGetCompanies = (params?: GetCompaniesParams) => {
  return useQuery({
    queryKey: [CompanyRefetchKeys.COMPANIES, params],
    queryFn: () => getCompanies(params)
  })
}

export const useGetCompanyById = (companyId: string, enabled: boolean) => {
  return useQuery({
    queryKey: [CompanyRefetchKeys.COMPANY, companyId],
    queryFn: () => getCompanyById(companyId),
    enabled
  })
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao criar empresa'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
    }
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao atualizar empresa'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
    }
  })
}

export const useMoveCompanyToTrash = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moveCompanyToTrash,
    onMutate: async (companyIds: number[]) => {
      await queryClient.cancelQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
      const previousCompanies = queryClient.getQueryData<
        ApiResponseWithPagination<Company[]>
      >([CompanyRefetchKeys.COMPANIES])
      if (previousCompanies) {
        queryClient.setQueryData<ApiResponseWithPagination<Company[]>>(
          [CompanyRefetchKeys.COMPANIES],
          {
            ...previousCompanies,
            data: {
              ...previousCompanies.data,
              data: previousCompanies.data.data.map(company =>
                companyIds.includes(company.companyId)
                  ? { ...company, deleted: true }
                  : company
              )
            }
          }
        )
      }
      return { previousCompanies }
    },
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError, _companyIds, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(
          [CompanyRefetchKeys.COMPANIES],
          context.previousCompanies
        )
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao mover empresa para lixeira'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
    }
  })
}

export const useRestoreCompanyFromTrash = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restoreCompanyFromTrash,
    onMutate: async (companyIds: number[]) => {
      await queryClient.cancelQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
      const previousCompanies = queryClient.getQueryData<
        ApiResponseWithPagination<Company[]>
      >([CompanyRefetchKeys.COMPANIES])
      if (previousCompanies) {
        queryClient.setQueryData<ApiResponseWithPagination<Company[]>>(
          [CompanyRefetchKeys.COMPANIES],
          {
            ...previousCompanies,
            data: {
              ...previousCompanies.data,
              data: previousCompanies.data.data.map(company =>
                companyIds.includes(company.companyId)
                  ? { ...company, deleted: false }
                  : company
              )
            }
          }
        )
      }
      return { previousCompanies }
    },
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError, _companyIds, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(
          [CompanyRefetchKeys.COMPANIES],
          context.previousCompanies
        )
      }
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao restaurar empresa'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
    }
  })
}

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message ||
          'Erro ao deletar empresa'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [CompanyRefetchKeys.COMPANIES]
      })
    }
  })
}

export const CompanyQueries = {
  useGetCompanies,
  useGetCompanyById
}

export const CompanyMutations = {
  useCreateCompany,
  useUpdateCompany,
  useMoveCompanyToTrash,
  useRestoreCompanyFromTrash,
  useDeleteCompany
}
