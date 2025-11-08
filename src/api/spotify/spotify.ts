import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'

import { SPOTIFY_CONFIG } from '$api/spotify/spotify.constants'

import { useAuth } from './auth'
import { useSpotifyStore } from './spotify.store'

export const useSpotifyApi = () => {
  const { logout, isAuthenticated } = useSpotifyStore()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CONFIG.CLIENT_ID,
      scopes: SPOTIFY_CONFIG.SCOPES,
      redirectUri: makeRedirectUri({ scheme: 'spotifylab', path: 'oauth' }),
    },
    {
      authorizationEndpoint: `${SPOTIFY_CONFIG.ACCOUNTS_BASE_URL}/authorize`,
    }
  )

  const { mutate: getToken, isPending: isGettingToken } = useAuth()
  useEffect(() => {
    const fetchToken = async () => {
      if (response) {
        if (!request?.codeVerifier) {
          throw new Error('Code verifier is required')
        }
        if (!request?.redirectUri) {
          throw new Error('Redirect URI is required')
        }
        if (response.type === 'success') {
          getToken({
            codeVerifier: request.codeVerifier,
            redirectUri: request.redirectUri,
            code: response.params.code,
          })
        } else if (response.type === 'error') {
          console.error('Login error:', response.error)
        }
      }
    }
    fetchToken()
  }, [request?.codeVerifier, request?.redirectUri, response, getToken])

  return {
    loginInBrowser: promptAsync,
    isGettingToken,
    logout,
    isAuthenticated,
  }
}
