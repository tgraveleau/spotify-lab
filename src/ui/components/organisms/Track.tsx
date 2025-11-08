import { Image } from 'react-native'

import { Track as TrackType } from '$types/track'

import { Box, HStack, Text } from '../atoms'
import { Badge } from '../molecules/Badge'

export type TrackProps = {
  track: TrackType
}
export const Track = ({ track }: TrackProps) => {
  return (
    <HStack className="items-center gap-sm px-sm py-xxs">
      <Image source={{ uri: track.album.image }} className="w-12 h-12 rounded" />
      <Box className="flex-1">
        <Text>{track.name}</Text>
        <HStack className="items-center gap-xxs">
          {track.explicit && <Badge text="E" />}
          <Text variant="caption">{track.artists.map((artist) => artist.name).join(', ')}</Text>
        </HStack>
      </Box>
    </HStack>
  )
}
