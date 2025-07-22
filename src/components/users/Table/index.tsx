import type { User } from '@/domain/interfaces/user'

import { TableTemplate } from '@/components/common/TableTemplate/index'
import { columns } from '@/components/users/Table/columns'
import { UserQueries } from '@/services/queries/user'
import { useUsersFilterStore } from '@/stores/usersFilterStore'

export const UsersTable = () => {
  const { deleted, search, page, pageSize, sortBy, sortDirection } =
    useUsersFilterStore()
  const users = UserQueries.useGetUsers({
    deleted,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection
  })

  return (
    <TableTemplate<User>
      data={users.data?.data?.data || []}
      isLoading={users.isLoading}
      columns={columns}
    />
  )
}
