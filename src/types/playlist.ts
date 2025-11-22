import { Track } from './track'

export type Playlist = {
  id: string
  name: string
  description: string
  image: string
  externalUrl: string
  tracks: Track[]
  uri: string
}
