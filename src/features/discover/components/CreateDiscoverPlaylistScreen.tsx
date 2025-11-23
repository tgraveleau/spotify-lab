import { ActivityIndicator, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'

import { Artist } from '$types/artist.type'
import { Track } from '$types/track.type'
import { Box, HStack, Text } from '$ui/components/atoms'
import { Button } from '$ui/components/molecules'
import { FlatList, Track as TrackComponent } from '$ui/components/organisms'

type CreateDiscoverPlaylistScreenProps = {
  selectedArtists: Artist[]
  tracksPerArtist: number
  tracks: Track[] | null
  isCreatingPlaylist: boolean
  playlistUrl?: string
  onCreatePlaylist: () => void
}

export const CreateDiscoverPlaylistScreen = ({
  selectedArtists,
  tracksPerArtist,
  tracks,
  isCreatingPlaylist,
  playlistUrl,
  onCreatePlaylist,
}: CreateDiscoverPlaylistScreenProps) => {
  const insets = useSafeAreaInsets()

  return (
    <Box className="flex-1" style={{ width: '100%' }}>
      {!tracks ? (
        <Box centered className="flex-1">
          <ActivityIndicator />
          <Text variant="ghost" className="text-darker-white mt-md">
            Chargement des titres...
          </Text>
        </Box>
      ) : (
        <>
          <Box className="px-md pt-md gap-sm">
            <Text weight="semibold">Prévisualisation de votre playlist</Text>
            <Text variant="ghost" className="text-darker-white">
              {selectedArtists.length} artiste{selectedArtists.length > 1 ? 's' : ''} •{' '}
              {tracks.length} titre{tracks.length > 1 ? 's' : ''} ({tracksPerArtist} par artiste)
            </Text>
          </Box>
          <FlatList
            keyExtractor={(item) => item.id}
            data={tracks}
            renderItem={({ item }) => <TrackComponent track={item} />}
            className="flex-1"
          />
          <HStack
            className={twMerge('px-md pt-xs gap-sm', playlistUrl ? 'justify-between' : 'px-md')}
          >
            <Button
              title="Créer ma playlist"
              className="flex-1"
              onPress={onCreatePlaylist}
              isLoading={isCreatingPlaylist}
            />
            {playlistUrl && (
              <Button
                title="Écouter"
                variant="secondary"
                iconRight="open-outline"
                onPress={() => Linking.openURL(playlistUrl)}
              />
            )}
          </HStack>
          <Box style={{ height: insets.bottom }} />
        </>
      )}
    </Box>
  )
}
