import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { SPOTIFY_CONFIG } from '$api/spotify/spotify.constants'
import { useSpotifyStore } from '$api/spotify/spotify.store'

import { Scopes } from './spotify.types'

export const spotifyAccountsApi = axios.create({
  baseURL: SPOTIFY_CONFIG.ACCOUNTS_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export const spotifyApi = axios.create({
  baseURL: SPOTIFY_CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (error?: unknown) => void
}[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor: adds the access token to the Authorization header
spotifyApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useSpotifyStore.getState().accessToken
    const tokenType = useSpotifyStore.getState().tokenType ?? 'Bearer'
    if (accessToken) {
      config.headers.Authorization = `${tokenType} ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor: handles the refresh token in case of 401 error
spotifyApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If the error is 401 and we haven't already attempted a refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return spotifyApi(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = useSpotifyStore.getState().refreshToken

      if (!refreshToken) {
        isRefreshing = false
        processQueue(error, null)
        return Promise.reject(error)
      }

      try {
        const body = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: SPOTIFY_CONFIG.CLIENT_ID,
        })

        const response = await spotifyAccountsApi.post<{
          access_token: string
          refresh_token: string
          expires_in: number
          token_type: string
          scope: Scopes[]
        }>('/api/token', body.toString())

        const { access_token, refresh_token: newRefreshToken, token_type } = response.data

        useSpotifyStore.getState().login(access_token, newRefreshToken || refreshToken, token_type)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `${token_type} ${access_token}`
        }

        isRefreshing = false
        processQueue(null, access_token)

        return spotifyApi(originalRequest)
      } catch (refreshError) {
        isRefreshing = false
        processQueue(refreshError as AxiosError, null)

        useSpotifyStore.getState().logout()

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
