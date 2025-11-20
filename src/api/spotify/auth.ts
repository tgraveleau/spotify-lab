import { useMutation } from '@tanstack/react-query'

import { spotifyAccountsApi, spotifyApi } from './spotify.api'
import { SPOTIFY_CONFIG } from './spotify.constants'
import { useSpotifyStore } from './spotify.store'
import { Scopes } from './spotify.types'

export const useAuth = () => {
  const { login } = useSpotifyStore()
  return useMutation({
    mutationFn: async ({
      codeVerifier,
      redirectUri,
      code,
    }: {
      codeVerifier: string
      redirectUri: string
      code: string
    }) => {
      const response = await spotifyAccountsApi.post<{
        access_token: string
        refresh_token: string
        expires_in: number
        token_type: string
        scope: Scopes[]
      }>(
        '/api/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: SPOTIFY_CONFIG.CLIENT_ID,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
          code,
        }).toString()
      )
      return response.data
    },
    onSuccess: async (data) => {
      login(data.access_token, data.refresh_token, data.token_type)
      const response = await spotifyApi.get<{
        id: string
        display_name: string
        images: { url: string }[]
      }>('/me')
      useSpotifyStore.setState({
        user: {
          id: response.data.id,
          displayName: response.data.display_name,
          image: response.data.images[0]?.url,
        },
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
