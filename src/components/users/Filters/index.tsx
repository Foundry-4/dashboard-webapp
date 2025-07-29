import { SearchIcon, TrashIcon } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useUsersFilterStore } from '@/stores/usersFilterStore'

export const UsersFilters = () => {
  const { deleted, search, setDeleted, setSearch, reset } =
    useUsersFilterStore()

  const {
    searchInput,
    handleSearchChange,
    reset: resetSearch
  } = useDebouncedSearch({
    initialValue: search,
    delay: 500,
    onSearch: setSearch
  })

  const handleReset = useCallback(() => {
    reset()
    resetSearch()
  }, [reset, resetSearch])

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Buscar usuário..."
          value={searchInput}
          onChange={handleSearchChange}
          className="h-8 max-w-[220px]"
          rightIcon={<SearchIcon className="h-4 w-4" />}
        />
      </div>

      <div className="flex items-center gap-4">
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

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
