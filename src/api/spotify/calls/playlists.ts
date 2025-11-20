import { useMutation } from '@tanstack/react-query'

import { spotifyApi } from '../spotify.api'
import { useSpotifyStore } from '../spotify.store'

type PlaylistResponse = {
  id: string
  name: string
  description: string
  public: boolean
  uri: string
  href: string
  images: { url: string }[]
}

export const useCreatePlaylist = () => {
  const { user } = useSpotifyStore()
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!user) {
        throw new Error('User not found')
      }
      const response = await spotifyApi.post<{
        external_urls: {
          spotify: string
        }
      }>(`/users/${user.id}/playlists`, {
        name,
        description: 'Created with Spotify Lab',
      })
      return {
        external_url: response.data.external_urls.spotify,
      }
    },
    onSuccess: (data) => {
      console.log('playlist created', data)
    },
  })
}
