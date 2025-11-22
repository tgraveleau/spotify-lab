import { SimplifiedArtistDTO } from '$api/spotify/spotify.types'
import { Artist } from '$types/artist'

export const adaptSimplifiedArtist = (artist: SimplifiedArtistDTO): Artist => ({
  id: artist.id,
  name: artist.name,
  externalUrl: artist.external_urls.spotify,
  uri: artist.uri,
})
