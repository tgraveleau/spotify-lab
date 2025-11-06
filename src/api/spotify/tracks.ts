import { useQuery } from '@tanstack/react-query'

import { spotifyApi } from './spotify.api'

export const useTopTracks = () => {
  return useQuery({
    queryKey: ['top-tracks'],
    queryFn: async () => {
      const response = await spotifyApi.get('/me/top/tracks', {
        params: {
          time_range: 'short_term',
        },
      })
      return response.data.items
    },
  })
}
