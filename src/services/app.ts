import { useSpotifyStore } from '$api/spotify/spotify.store'
import { useFonts } from '$ui/theme/fonts'

import { useIsHydrated } from './zustand'

export const useIsAppLoaded = () => {
  const fontsLoaded = useFonts()
  const isSpotifyStoreHydrated = useIsHydrated(useSpotifyStore)

  const appLoaded = [fontsLoaded, isSpotifyStoreHydrated].every(Boolean)
  return appLoaded
}
