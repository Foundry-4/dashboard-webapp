import { useQuery } from '@tanstack/react-query'

import type { GetRolesParams } from '@/domain/interfaces/roles'

import { RoleRefetchKeys } from '@/domain/constants/role'
import { getRoleById } from '@/services/requests/roles/get-role-by-id'
import { getRoles } from '@/services/requests/roles/get-roles'

export const useGetRoles = (params?: GetRolesParams) => {
  return useQuery({
    queryKey: [RoleRefetchKeys.ROLES, params],
    queryFn: () => getRoles(params)
  })
}

export const useGetRoleById = (roleId: string) => {
  return useQuery({
    queryKey: [RoleRefetchKeys.ROLE, roleId],
    queryFn: () => getRoleById(roleId)
  })
}

export const RoleQueries = {
  useGetRoleById,
  useGetRoles
}
