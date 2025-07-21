import type { User } from '@/domain/interfaces/user'

import { TableTemplate } from '@/components/common/TableTemplate'
import { columns } from '@/components/users/Table/columns'
import { UserQueries } from '@/services/queries/user'

export default function Users() {
  const users = UserQueries.useGetUsers()

  return (
    <div className="w-full">
      <TableTemplate<User>
        query={users}
        columns={columns}
      />
    </div>
  )
}
