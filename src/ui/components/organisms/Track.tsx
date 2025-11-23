import { twMerge } from 'tailwind-merge'

import { Track as TrackType } from '$types/track.type'

import { Box, BoxProps, HStack, Text } from '../atoms'
import { Avatar } from '../atoms/Avatar'

export type TrackProps = {
  track: TrackType
}
export const Track = ({ track }: TrackProps) => {
  return (
    <HStack centered className="gap-sm px-sm py-xxs">
      <Avatar source={{ uri: track.album.image }} notFullyRounded />
      <Box className="flex-1">
        <Text>{track.name}</Text>
        <HStack className="items-center gap-xxs">
          {track.explicit && <ExplicitBadge text="E" />}
          <Text variant="ghost">{track.artists.map((artist) => artist.name).join(', ')}</Text>
        </HStack>
      </Box>
    </HStack>
  )
}

type ExplicitBadgeProps = BoxProps & {
  text: string
}
const ExplicitBadge = ({ text, className, ...props }: ExplicitBadgeProps) => {
  return (
    <Box
      className={twMerge(
        'rounded-sm items-center justify-center px-[2px] bg-darker-white text-black',
        className
      )}
      {...props}
    >
      <Text className="text-xs font-semibold text-black">{text}</Text>
    </Box>
  )
}
