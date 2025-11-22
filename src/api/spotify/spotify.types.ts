type ExternalURLs = { spotify: string }
type Image = {
  url: string
  height?: number | null
  width?: number | null
}
type Followers = {
  href?: string | null // toujours null côté API aujourd'hui, doc le précise
  total: number
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term'

export type SimplifiedArtistDTO = {
  id: string
  name: string
  external_urls: ExternalURLs
  type: 'artist'
  uri: string
}

export type AlbumDTO = {
  album_type: 'album' | 'single' | 'compilation'
  total_tracks: number
  available_markets: string[] // ISO 3166-1 alpha-2
  external_urls: ExternalURLs
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  restrictions?: { reason: 'market' | 'product' | 'explicit' } | null
  type: 'album'
  uri: string
  artists: SimplifiedArtistDTO[] // artistes listés sur l'album
}

export type TrackDTO = {
  album: AlbumDTO
  artists: SimplifiedArtistDTO[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids?: Record<string, string> // e.g. isrc
  external_urls: ExternalURLs
  href: string
  id: string
  is_playable?: boolean
  linked_from?: Record<string, any>
  restrictions?: { reason: string } | null
  name: string
  popularity: number // 0 - 100
  preview_url?: string | null
  track_number: number
  type: 'track'
  uri: string
  is_local?: boolean
}

export type ArtistDTO = {
  external_urls: ExternalURLs
  followers: Followers
  genres: string[] // peut être vide
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number // 0 - 100
  type: 'artist'
  uri: string
}

export type PlaylistDTO = {
  id: string
  name: string
  description: string
  images: Image[]
  external_urls: ExternalURLs
  tracks: PaginatedResponse<{
    track: TrackDTO
  }>
  uri: string
}

export type PaginatedResponse<T> = {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: T[]
}

export type Scopes = 'user-top-read' | 'playlist-modify-public'

export type User = {
  id: string
  displayName: string
  images?: Image[]
}
