import { Track } from './track.type'

export type Playlist = {
  id: string
  name: string
  description: string
  image?: string
  externalUrl: string
  tracks: Track[]
  uri: string
}
