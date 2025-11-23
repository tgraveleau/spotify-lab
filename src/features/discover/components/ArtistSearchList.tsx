import { useState } from 'react'

import { useSearch } from '$api/spotify/calls/search'
import { Artist } from '$types/artist.type'
import { Box, Text } from '$ui/components/atoms'
import { Badge, Button, SearchList } from '$ui/components/molecules'
import { ArtistSearchResult, FlatList } from '$ui/components/organisms'

type ArtistSearchListProps = {
  selectedArtists: Artist[]
  tracksPerArtist: number
  onArtistsChange: (artists: Artist[]) => void
  onTracksPerArtistChange: (count: number) => void
  onContinue: () => void
}

export const ArtistSearchList = ({
  selectedArtists,
  tracksPerArtist,
  onArtistsChange,
  onTracksPerArtistChange,
  onContinue,
}: ArtistSearchListProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: artists = [], isLoading } = useSearch({
    type: 'artist',
    query: searchQuery,
  })

  const handleRemoveArtist = (artistId: string) => {
    onArtistsChange(selectedArtists.filter((a) => a.id !== artistId))
  }
  const handlePressArtist = (artist: Artist) => {
    if (selectedArtists.some((a) => a.id === artist.id)) {
      handleRemoveArtist(artist.id)
    } else {
      onArtistsChange([...selectedArtists, artist])
    }
  }

  return (
    <Box className="flex-1">
      <SearchList<Artist>
        data={artists as Artist[]}
        onSearchChange={setSearchQuery}
        ListHeaderComponent={
          <Box className="mb-sm">
            {/* {showCountSelector && countValue !== undefined && onCountChange && (
              <Box className="gap-sm">
                <Text variant="subtitle" weight="semibold">
                  {countSelectorTitle}
                </Text>
                <HStack className="gap-sm">
                  {countOptions.map((count) => (
                    <Button
                      key={count}
                      title={formatCountLabel(count)}
                      variant={countValue === count ? 'primary' : 'secondary'}
                      size="sm"
                      onPress={() => onCountChange(count)}
                      className="flex-1"
                    />
                  ))}
                </HStack>
              </Box>
            )} */}
            {selectedArtists.length > 0 ? (
              <FlatList
                horizontal
                data={selectedArtists}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Box className="w-sm" />}
                renderItem={({ item }) => (
                  <Badge text={item.name} onIconPress={() => handleRemoveArtist(item.id)} />
                )}
                ItemSeparatorComponent={() => <Box className="w-xs" />}
                ListFooterComponent={() => <Box className="w-sm" />}
              />
            ) : (
              <Box className="px-sm py-xxs">
                <Text variant="ghost">Aucun artiste sélectionné</Text>
              </Box>
            )}
          </Box>
        }
        renderItem={({ item }) => (
          <ArtistSearchResult
            artist={item}
            onPress={() => handlePressArtist(item)}
            isSelected={selectedArtists.some((a) => a.id === item.id)}
          />
        )}
      />
      <Box className="px-lg py-sm">
        <Button title="Continuer" onPress={onContinue} disabled={selectedArtists.length === 0} />
      </Box>
    </Box>
  )
}
