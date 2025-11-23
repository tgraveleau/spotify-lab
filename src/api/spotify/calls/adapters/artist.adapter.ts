import { SimplifiedArtistDTO } from '$api/spotify/spotify.types'
import { Artist } from '$types/artist.type'

export const adaptSimplifiedArtist = (artist: SimplifiedArtistDTO): Artist => ({
  id: artist.id,
  name: artist.name,
  image: artist.images[0]?.url,
  externalUrl: artist.external_urls.spotify,
  uri: artist.uri,
  genres: artist.genres,
  followers: artist.followers.total,
})
