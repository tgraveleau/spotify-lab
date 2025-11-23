import { useState } from 'react'

import { Box } from '../atoms'
import { Input } from './Input'
import { FlatList, FlatListProps } from '../organisms'

export type SearchListProps<T> = FlatListProps<T> & {
  onSearchChange: (query: string) => void
  searchPlaceholder?: string
}

export const SearchList = <T,>({
  onSearchChange,
  searchPlaceholder = 'Rechercher...',
  ...props
}: SearchListProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onSearchChange(query)
  }

  return (
    <Box className="flex-1 gap-md">
      <Box className="px-sm">
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChangeText={handleSearchChange}
          iconRight="search"
        />
      </Box>
      <FlatList {...props} />
    </Box>
  )
}
