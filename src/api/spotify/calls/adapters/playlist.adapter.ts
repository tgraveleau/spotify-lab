import { PlaylistDTO } from '$api/spotify/spotify.types'
import { Playlist } from '$types/playlist'

import { adaptTrack } from './track.adapter'

export const adaptPlaylist = (playlist: PlaylistDTO): Playlist => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description,
  image: playlist.images[0].url,
  externalUrl: playlist.external_urls.spotify,
  tracks: playlist.tracks.items.map((item) => adaptTrack(item.track)),
  uri: playlist.uri,
})
