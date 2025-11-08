import { useMutation } from '@tanstack/react-query'

import { spotifyAccountsApi } from './spotify.api'
import { SPOTIFY_CONFIG } from './spotify.constants'
import { useSpotifyStore } from './spotify.store'
import { AuthResponse } from './spotify.types'

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
      const response = await spotifyAccountsApi.post<AuthResponse>(
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
    onSuccess: (data) => {
      login(data.access_token, data.refresh_token, data.token_type)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
