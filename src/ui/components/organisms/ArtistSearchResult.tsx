import { Artist } from '$types/artist.type'
import { formatNumber } from '$ui/text.utils'
import { colors } from '$ui/theme/colors'

import { Avatar, Box, HStack, Text } from '../atoms'
import { Badge, IconButton } from '../molecules'

export type ArtistSearchResultProps = {
  artist: Artist
  onPress: () => void
  isSelected?: boolean
}
export const ArtistSearchResult = ({ artist, onPress, isSelected }: ArtistSearchResultProps) => {
  return (
    <HStack centered className="gap-sm px-sm py-xs">
      {artist.image && <Avatar source={{ uri: artist.image }} notFullyRounded />}
      <Box className="flex-1">
        <HStack className="items-center gap-sm">
          <Text weight="semibold">{artist.name}</Text>
          {artist.genres && artist.genres.length > 0 && (
            <HStack centered className="gap-xs">
              {artist.genres.slice(0, 2).map((genre) => (
                <Badge key={genre} text={genre} skinny />
              ))}
            </HStack>
          )}
        </HStack>
        {artist.followers && (
          <Text variant="ghost" className="text-darker-white">
            {formatNumber(artist.followers)} auditeurs mensuels
          </Text>
        )}
      </Box>
      <IconButton
        name={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
        size="sm"
        variant={isSelected ? 'primary' : 'ghost'}
        color={isSelected ? colors.primary : undefined}
        onPress={onPress}
        noContainer
      />
    </HStack>
  )
}
