// types/spotify.ts

export type ExternalURLs = { spotify: string }

export interface Image {
  url: string
  height?: number | null
  width?: number | null
}

export interface Followers {
  href?: string | null // toujours null côté API aujourd'hui, doc le précise
  total: number
}

/** Simplified artist object used inside Track/Album */
export interface SimplifiedArtist {
  external_urls: ExternalURLs
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
}

/** Album object as returned inside a TrackObject */
export interface Album {
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
  artists: SimplifiedArtist[] // artistes listés sur l'album
}

/** Full TrackObject (champs pertinents pour /me/top/tracks) */
export interface TopTrack {
  album: Album
  artists: SimplifiedArtist[]
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

/** Full ArtistObject (champs pertinents pour /me/top/artists) */
export interface TopArtist {
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

export interface PaginatedResponse<T> {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: T[]
}

export type Scopes = 'user-top-read' | 'playlist-modify-public'

export type AuthResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: Scopes[]
}
