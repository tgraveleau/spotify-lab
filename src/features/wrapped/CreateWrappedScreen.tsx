import { ActivityIndicator, Linking } from 'react-native'
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
  const { mutate: createPlaylist, data: playlist } = useCreatePlaylist()

  return (
    <Screen withBackButton title={`Create Wrapped for ${timeRange}`}>
      {!data ? (
        <Box centered className="flex-1">
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          withBottomSafeArea
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => <Track track={item} />}
        />
      )}
      <HStack className={twMerge('px-xxl py-xs gap-sm', playlist ? 'justify-between' : 'px-xxl')}>
        <Button
          title="Create playlist"
          className="flex-1"
          onPress={() => {
            const now = new Date()
            const year = now.getFullYear()
            const month = String(now.getMonth() + 1).padStart(2, '0')
            createPlaylist({ name: `Wrapped ${year}-${month} ${timeRange}`, tracks: data })
          }}
        />
        {playlist && (
          <Button
            title="Listen"
            variant="secondary"
            iconRight="external-link"
            onPress={() => Linking.openURL(playlist?.externalUrl ?? '')}
          />
        )}
      </HStack>
    </Screen>
  )
}
