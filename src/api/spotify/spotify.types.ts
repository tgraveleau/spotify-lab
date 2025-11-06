export type Artist = {
  id: string
  name: string
}

export type Album = {
  id: string
  name: string
  images: string[]
}

export type Track = {
  id: string
  name: string
  artists: Artist[]
  album: Album
  duration_ms: number
  popularity: number
}

export type Scopes = 'user-top-read' | 'playlist-modify-public'

export type AuthResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: Scopes[]
}
