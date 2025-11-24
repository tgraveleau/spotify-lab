import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'

import { Track } from '$types/track.type'
import { Box } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'

import { ArtistSearchList } from './components/ArtistSearchList'
import { CreateDiscoverPlaylistScreen } from './components/CreateDiscoverPlaylistScreen'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const CreateDiscoverScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [step, setStep] = useState<'search' | 'playlist'>('search')
  const [tracks, setTracks] = useState<Track[]>([])
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const [playlistUrl, setPlaylistUrl] = useState<string>()

  const handleContinueFromSearch = (tracks: Track[]) => {
    setTracks(tracks)
    setStep('playlist')
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

  const onBackButtonPress = () => {
    if (step === 'search') {
      router.back()
    } else {
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      })
      setStep('search')
    }
  }

  return (
    <Screen
      withBackButton
      title="Créer une playlist"
      subtitle="Découvrez de nouveaux artistes"
      onBackButtonPress={onBackButtonPress}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        className="flex-1"
      >
        <Box style={{ width: SCREEN_WIDTH }}>
          <ArtistSearchList onContinue={handleContinueFromSearch} />
        </Box>
        <Box style={{ width: SCREEN_WIDTH }}>
          <CreateDiscoverPlaylistScreen
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
