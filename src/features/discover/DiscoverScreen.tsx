import { Linking } from 'react-native'

import { useCreatePlaylist } from '$api/spotify/calls/playlists'
import { Box } from '$ui/components/atoms'
import { TabScreen } from '$ui/components/layout'
import { Button } from '$ui/components/molecules'

export const DiscoverScreen = () => {
  const { mutate: createPlaylist, data: playlist } = useCreatePlaylist()
  return (
    <TabScreen
      title="Discover"
      subtitle="Create a playlist with a few songs of artists of your choice"
    >
      <Box className="flex-1 px-md">
        <Button
          title="Create playlist"
          onPress={() =>
            createPlaylist({
              name: 'My playlist',
            })
          }
        />
        {playlist ? (
          <Button
            title="Open playlist"
            variant="secondary"
            iconRight="external-link"
            onPress={() => Linking.openURL(playlist.externalUrl)}
          />
        ) : (
          <Button
            title="Create playlist"
            onPress={() =>
              createPlaylist({
                name: 'My playlist',
              })
            }
          />
        )}
      </Box>
    </TabScreen>
  )
}
