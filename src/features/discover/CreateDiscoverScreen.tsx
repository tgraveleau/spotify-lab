import { useRef, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'

import { Artist } from '$types/artist.type'
import { Track } from '$types/track.type'
import { Box } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'

import { ArtistSearchList } from './components/ArtistSearchList'
import { CreateDiscoverPlaylistScreen } from './components/CreateDiscoverPlaylistScreen'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const CreateDiscoverScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([])
  const [tracksPerArtist, setTracksPerArtist] = useState(3)
  // TODO: Replace with actual API call to fetch tracks
  const [tracks, setTracks] = useState<Track[] | null>(null)
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const [playlistUrl, setPlaylistUrl] = useState<string>()

  const handleContinueFromSearch = () => {
    // TODO: Fetch tracks for selected artists
    // For now, set tracks to empty array to show loading state
    setTracks(null)
    scrollViewRef.current?.scrollTo({
      x: SCREEN_WIDTH,
      animated: true,
    })
  }

  const handleCreatePlaylist = () => {
    // TODO: Implement playlist creation
    setIsCreatingPlaylist(true)
    // Simulate API call
    setTimeout(() => {
      setIsCreatingPlaylist(false)
      setPlaylistUrl('https://open.spotify.com/playlist/example')
    }, 2000)
  }

  return (
    <Screen withBackButton title="Créer une playlist" subtitle="Découvrez de nouveaux artistes">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        className="flex-1"
      >
        <Box style={{ width: SCREEN_WIDTH }}>
          <ArtistSearchList
            selectedArtists={selectedArtists}
            tracksPerArtist={tracksPerArtist}
            onArtistsChange={setSelectedArtists}
            onTracksPerArtistChange={setTracksPerArtist}
            onContinue={handleContinueFromSearch}
          />
        </Box>
        <Box style={{ width: SCREEN_WIDTH }}>
          <CreateDiscoverPlaylistScreen
            selectedArtists={selectedArtists}
            tracksPerArtist={tracksPerArtist}
            tracks={tracks}
            isCreatingPlaylist={isCreatingPlaylist}
            playlistUrl={playlistUrl}
            onCreatePlaylist={handleCreatePlaylist}
          />
        </Box>
      </ScrollView>
    </Screen>
  )
}
