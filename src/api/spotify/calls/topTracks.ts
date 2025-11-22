import { useQuery } from '@tanstack/react-query'

import { spotifyApi } from '../spotify.api'
import { PaginatedResponse, TimeRange, TrackDTO } from '../spotify.types'
import { adaptTrack } from './adapters/track.adapter'

export const useTopTracks = ({
  timeRange,
  nbOfTracks = 50,
}: {
  timeRange: TimeRange
  nbOfTracks?: number
}) => {
  return useQuery({
    queryKey: ['top-tracks', timeRange, nbOfTracks],
    queryFn: async () => {
      const response = await spotifyApi.get<PaginatedResponse<TrackDTO>>('/me/top/tracks', {
        params: {
          time_range: timeRange,
          limit: nbOfTracks,
        },
      })
      return response.data.items.map(adaptTrack)
    },
  })
}
