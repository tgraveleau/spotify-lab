import { useQuery } from '@tanstack/react-query'

import { Artist } from '$types/artist.type'
import { Track } from '$types/track.type'

import { spotifyApi } from '../spotify.api'
import { TrackDTO } from '../spotify.types'
import { adaptTrack } from './adapters/track.adapter'

export const useArtistsTopTracks = ({ artists }: { artists: Artist[] }) => {
  return useQuery({
    queryKey: ['artists-top-tracks', artists.map((artist) => artist.id)],
    queryFn: async () => {
      const tracks: Track[] = []
      for (const artist of artists) {
        const response = await spotifyApi.get<{ tracks: TrackDTO[] }>(
          `/artists/${artist.id}/top-tracks`
        )
        const currentTracks = response.data.tracks.slice(0, 3).map(adaptTrack)
        tracks.push(...currentTracks)
      }
      return tracks
    },
    enabled: artists.length > 0,
  })
}
