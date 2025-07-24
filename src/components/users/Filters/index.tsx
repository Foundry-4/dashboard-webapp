import { SearchIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useUsersFilterStore } from '@/stores/usersFilterStore'

export const UsersFilters = () => {
  const { deleted, search, setDeleted, setSearch } = useUsersFilterStore()

  const { searchInput, handleSearchChange } = useDebouncedSearch({
    initialValue: search,
    delay: 500,
    onSearch: setSearch
  })

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <Button
        variant={deleted ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setDeleted(!deleted)}
      >
        <TrashIcon
          className="h-4 w-4"
          color={deleted ? 'black' : 'red'}
        />
        <p className="text-sm font-medium whitespace-nowrap">Na lixeira</p>
      </Button>

      <Input
        placeholder="Pesquisar usuário"
        className="h-8"
        containerClassName="max-w-[220px]"
        value={searchInput}
        onChange={handleSearchChange}
        rightIcon={<SearchIcon className="h-4 w-4" />}
      />
    </div>
  )
}
