import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface UseDebouncedSearchOptions {
  initialValue?: string
  delay?: number
  onSearch?: (value: string) => void
}

export const useDebouncedSearch = ({
  initialValue = '',
  delay = 500,
  onSearch
}: UseDebouncedSearchOptions = {}) => {
  const [searchInput, setSearchInput] = useState(initialValue)

  // Sync searchInput with initialValue when it changes externally
  useEffect(() => {
    setSearchInput(initialValue)
  }, [initialValue])

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    onSearch?.(value)
  }, delay)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value) // Update UI immediately
    debouncedSetSearch(value) // Debounce the search callback
  }

  const reset = () => {
    setSearchInput('')
    onSearch?.('')
  }

  return {
    searchInput, // For immediate UI updates
    handleSearchChange, // For input onChange
    reset, // To clear the search
    setSearchInput // Direct setter if needed
  }
}
