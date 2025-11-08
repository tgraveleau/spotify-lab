import { Album } from './album'
import { Artist } from './artist'

export type Track = {
  id: string
  name: string
  artists: Artist[]
  album: Album
  duration: number
  href: string
  uri: string
  previewUrl?: string
  explicit: boolean
}
