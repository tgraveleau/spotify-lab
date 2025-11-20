import { useQuery } from '@tanstack/react-query'

import { Track } from '$types/track'

import { spotifyApi } from '../spotify.api'
import { PaginatedResponse, TopTrack } from '../spotify.types'

export const useTopTracks = () => {
  return useQuery({
    queryKey: ['top-tracks'],
    queryFn: async () => {
      const response = await spotifyApi.get<PaginatedResponse<TopTrack>>('/me/top/tracks', {
        params: {
          time_range: 'short_term',
        },
      })
      return response.data.items.map(
        (item): Track => ({
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
            href: artist.href,
            uri: artist.uri,
          })),
          album: {
            id: item.album.id,
            name: item.album.name,
            artists: item.album.artists.map((artist) => ({
              id: artist.id,
              name: artist.name,
              href: artist.href,
              uri: artist.uri,
            })),
            image: item.album.images[0].url,
            href: item.album.href,
            uri: item.album.uri,
            type: item.album.album_type,
            totalTracks: item.album.total_tracks,
            releaseDate: item.album.release_date,
            releaseDatePrecision: item.album.release_date_precision,
          },
          duration: item.duration_ms,
          href: item.href,
          uri: item.uri,
          previewUrl: item.preview_url ?? undefined,
          explicit: item.explicit,
        })
      )
    },
  })
}
