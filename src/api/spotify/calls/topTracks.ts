import { useQuery } from '@tanstack/react-query'

import { spotifyApi } from '../spotify.api'
import { PaginatedResponse, TrackDTO } from '../spotify.types'
import { adaptTrack } from './adapters/track.adapter'

export const useTopTracks = () => {
  return useQuery({
    queryKey: ['top-tracks'],
    queryFn: async () => {
      const response = await spotifyApi.get<PaginatedResponse<TrackDTO>>('/me/top/tracks', {
        params: {
          time_range: 'short_term',
          limit: 50,
        },
      })
      return response.data.items.map(adaptTrack)
    },
  })
}
