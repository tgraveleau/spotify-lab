import { TrackDTO } from '$api/spotify/spotify.types'
import { Track } from '$types/track'

import { adaptAlbum } from './album.adapter'
import { adaptSimplifiedArtist } from './artist.adapter'

export const adaptTrack = (track: TrackDTO): Track => ({
  id: track.id,
  name: track.name,
  artists: track.artists.map(adaptSimplifiedArtist),
  album: adaptAlbum(track.album),
  duration: track.duration_ms,
  externalUrl: track.external_urls.spotify,
  previewUrl: track.preview_url ?? undefined,
  explicit: track.explicit,
  uri: track.uri,
})
