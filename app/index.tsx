import { Redirect } from 'expo-router'

import { useSpotifyApi } from '$api/spotify/spotify'
export default function RootRoute() {
  const { isAuthenticated } = useSpotifyApi()

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/wrapped" />
  }
  return <Redirect href="/(tabs)/profile" />
}
