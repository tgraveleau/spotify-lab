import { AlbumDTO } from '$api/spotify/spotify.types'
import { Album } from '$types/album.type'

import { adaptSimplifiedArtist } from './artist.adapter'

export const adaptAlbum = (album: AlbumDTO): Album => ({
  id: album.id,
  name: album.name,
  artists: album.artists.map(adaptSimplifiedArtist),
  image: album.images[0].url,
  externalUrl: album.external_urls.spotify,
  type: album.album_type,
  totalTracks: album.total_tracks,
  releaseDate: album.release_date,
  releaseDatePrecision: album.release_date_precision,
  uri: album.uri,
})
