import { Scopes } from './spotify.types'

export const SPOTIFY_CONFIG = {
  CLIENT_ID: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!,
  SCOPES: ['user-top-read', 'playlist-modify-public'] as Scopes[],
  ACCOUNTS_BASE_URL: process.env.EXPO_PUBLIC_SPOTIFY_ACCOUNTS_BASE_URL!,
  API_BASE_URL: process.env.EXPO_PUBLIC_SPOTIFY_API_BASE_URL!,
}
