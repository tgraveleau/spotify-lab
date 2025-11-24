import { Album } from './album.type'
import { Artist } from './artist.type'

export type Track = {
  id: string
  name: string
  artists: Artist[]
  album: Album
  duration: number
  externalUrl: string
  explicit: boolean
  uri: string
}
