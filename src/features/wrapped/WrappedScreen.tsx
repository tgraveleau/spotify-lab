import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTopTracks } from '$api/spotify/topTracks'
import { Box } from '$ui/components/atoms'
import { FlatList, TabScreen } from '$ui/components/molecules'
import { Track } from '$ui/components/organisms'

export const WrappedScreen = () => {
  const { data } = useTopTracks()
  const insets = useSafeAreaInsets()
  return (
    <TabScreen title="Wrapped" subtitle="Top tracks of last 4 weeks">
      <FlatList
        withBottomSafeArea
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => <Track track={item} />}
        ListFooterComponent={() => <Box style={{ height: insets.bottom }} />}
      />
    </TabScreen>
  )
}
