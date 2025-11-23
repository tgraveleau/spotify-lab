import { useMutation } from '@tanstack/react-query'

import { Track } from '$types/track.type'

import { spotifyApi } from '../spotify.api'
import { useSpotifyStore } from '../spotify.store'
import { PlaylistDTO } from '../spotify.types'
import { adaptPlaylist } from './adapters/playlist.adapter'

export const useCreatePlaylist = () => {
  const { user } = useSpotifyStore()
  return useMutation({
    mutationFn: async ({ name, tracks }: { name: string; tracks?: Track[] }) => {
      if (!user) {
        throw new Error('User not found')
      }
      const response = await spotifyApi.post<PlaylistDTO>(`/users/${user.id}/playlists`, {
        name,
        description: 'Created with Spotify Lab',
      })
      if (tracks) {
        await spotifyApi.post<{ snapshot_id: string }>(`/playlists/${response.data.id}/tracks`, {
          uris: tracks.map((track) => track.uri),
        })
      }
      return adaptPlaylist(response.data)
    },
  })
}
