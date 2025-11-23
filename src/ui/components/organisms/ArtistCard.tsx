import { Image } from 'expo-image'

import { Artist } from '$types/artist.type'
import { colors } from '$ui/theme/colors'

import { Box, HStack, Text } from '../atoms'
import { IconButton } from '../molecules/Button'

export type ArtistCardProps = {
  artist: Artist
  onRemove: () => void
}

export const ArtistCard = ({ artist, onRemove }: ArtistCardProps) => {
  return (
    <HStack centered className="bg-light-gray rounded-xl p-xs gap-xs">
      {artist.image ? (
        <Image source={{ uri: artist.image }} className="w-8 h-8 rounded-full" contentFit="cover" />
      ) : (
        <Box className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center">
          <Text weight="semibold" className="text-primary">
            {artist.name[0]?.toUpperCase() || 'A'}
          </Text>
        </Box>
      )}
      <Box className="flex-1">
        <Text variant="ghost" numberOfLines={1}>
          {artist.name}
        </Text>
      </Box>
      <IconButton
        name="close-circle"
        variant="ghost"
        size="sm"
        color={colors['darker-white']}
        onPress={onRemove}
      />
    </HStack>
  )
}
