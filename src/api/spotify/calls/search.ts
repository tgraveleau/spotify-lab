import { useQuery } from '@tanstack/react-query'

import { useDebounce } from '$hooks/useDebounce'
import { ItemType } from '$types/common.type'
import { NumberRange } from '$types/types.utils'

import { spotifyApi } from '../spotify.api'
import {
  AlbumDTO,
  PaginatedResponse,
  PlaylistDTO,
  SimplifiedArtistDTO,
  TrackDTO,
} from '../spotify.types'
import { adaptAlbum } from './adapters/album.adapter'
import { adaptSimplifiedArtist } from './adapters/artist.adapter'
import { adaptPlaylist } from './adapters/playlist.adapter'
import { adaptTrack } from './adapters/track.adapter'

export const useSearch = ({
  type,
  query,
  limit = 20,
}: {
  type: ItemType
  query?: string
  limit?: NumberRange<1, 50>
}) => {
  const debouncedQuery = useDebounce(query, 400)
  return useQuery({
    queryKey: ['search', type, debouncedQuery, limit],
    queryFn: async () => {
      const response = await spotifyApi.get<
        | { tracks: PaginatedResponse<TrackDTO> }
        | { artists: PaginatedResponse<SimplifiedArtistDTO> }
        | { albums: PaginatedResponse<AlbumDTO> }
        | { playlists: PaginatedResponse<PlaylistDTO> }
      >('/search', {
        params: {
          type,
          q: debouncedQuery,
          limit,
        },
      })
      if (type === 'track') {
        const data = response.data as { tracks: PaginatedResponse<TrackDTO> }
        return data.tracks.items.map(adaptTrack)
      } else if (type === 'artist') {
        const data = response.data as { artists: PaginatedResponse<SimplifiedArtistDTO> }
        return data.artists.items.map(adaptSimplifiedArtist)
      } else if (type === 'album') {
        const data = response.data as { albums: PaginatedResponse<AlbumDTO> }
        return data.albums.items.map(adaptAlbum)
      } else if (type === 'playlist') {
        const data = response.data as { playlists: PaginatedResponse<PlaylistDTO> }
        return data.playlists.items.map(adaptPlaylist)
      }
    },
    enabled: !!query && query.length > 0,
  })
}
