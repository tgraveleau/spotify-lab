import { Artist } from './artist'

export type Album = {
  id: string
  name: string
  artists: Artist[]
  image: string
  externalUrl: string
  type: 'album' | 'single' | 'compilation'
  totalTracks: number
  releaseDate: string
  releaseDatePrecision: 'year' | 'month' | 'day'
  uri: string
}
