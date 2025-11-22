import { ActivityIndicator, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'

import { useCreatePlaylist } from '$api/spotify/calls/playlists'
import { useTopTracks } from '$api/spotify/calls/topTracks'
import { TimeRange } from '$api/spotify/spotify.types'
import { Box, HStack } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'
import { Button } from '$ui/components/molecules'
import { FlatList, Track } from '$ui/components/organisms'

type CreateWrappedScreenProps = {
  timeRange?: TimeRange
}
export const CreateWrappedScreen = ({ timeRange = 'short_term' }: CreateWrappedScreenProps) => {
  const { data } = useTopTracks({ timeRange })
  const {
    mutate: createPlaylist,
    data: playlist,
    isPending: isCreatingPlaylist,
  } = useCreatePlaylist()
  const insets = useSafeAreaInsets()

  return (
    <Screen
      withBackButton
      title="Your wrapped"
      subtitle={`Discover your last ${timeRange} wrapped and create a playlist from it`}
    >
      {!data ? (
        <Box centered className="flex-1">
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => <Track track={item} />}
        />
      )}
      <HStack className={twMerge('px-xxl pt-xs gap-sm', playlist ? 'justify-between' : 'px-xxl')}>
        <Button
          title="Create my playlist"
          className="flex-1"
          onPress={() => {
            const now = new Date()
            const year = now.getFullYear()
            const month = String(now.getMonth() + 1).padStart(2, '0')
            createPlaylist({ name: `Wrapped ${year}-${month} ${timeRange}`, tracks: data })
          }}
          isLoading={isCreatingPlaylist}
        />
        {playlist && (
          <Button
            title="Listen"
            variant="secondary"
            iconRight="open-outline"
            onPress={() => Linking.openURL(playlist?.externalUrl ?? '')}
          />
        )}
      </HStack>
      <Box style={{ height: insets.bottom }} />
    </Screen>
  )
}
