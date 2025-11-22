import { Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTopTracks } from '$api/spotify/calls'
import { useCreatePlaylist } from '$api/spotify/calls/playlists'
import { Box, HStack } from '$ui/components/atoms'
import { TabScreen } from '$ui/components/layout'
import { Button } from '$ui/components/molecules'
import { FlatList, Track } from '$ui/components/organisms'

export const WrappedScreen = () => {
  const { data, refetch, isFetching } = useTopTracks()
  const insets = useSafeAreaInsets()
  const { mutate: createPlaylist, data: playlist } = useCreatePlaylist()
  return (
    <TabScreen title="Wrapped" subtitle="Top tracks of last 4 weeks">
      <FlatList
        withBottomSafeArea
        keyExtractor={(item) => item.id}
        data={data}
        ListHeaderComponent={() => (
          <HStack>
            <Button title="Refetch" onPress={() => refetch()} isLoading={isFetching} />
            <Button
              title="Create playlist"
              onPress={() => {
                const now = new Date()
                const year = now.getFullYear()
                const month = String(now.getMonth() + 1).padStart(2, '0')
                createPlaylist({ name: `Wrapped ${year}-${month}`, tracks: data })
              }}
            />
            <Button
              title={`Open ${playlist?.name ?? 'playlist'}`}
              variant="secondary"
              iconRight="external-link"
              onPress={() => Linking.openURL(playlist?.externalUrl ?? '')}
            />
          </HStack>
        )}
        renderItem={({ item }) => <Track track={item} />}
        ListFooterComponent={() => <Box style={{ height: insets.bottom }} />}
      />
    </TabScreen>
  )
}
