import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createStorage } from '$services/zustand'

import { User } from './spotify.types'

interface SpotifyState {
  accessToken?: string
  refreshToken?: string
  tokenType?: string
  login: (accessToken: string, refreshToken: string, tokenType: string) => void
  logout: () => void
  isAuthenticated: boolean
  user?: User
}

const KEY = 'spotify'
const storage = createStorage(KEY)
export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set, get) => ({
      login: (accessToken, refreshToken, tokenType) =>
        set({ accessToken, refreshToken, tokenType, isAuthenticated: true }),
      logout: () =>
        set({
          accessToken: undefined,
          refreshToken: undefined,
          tokenType: undefined,
          isAuthenticated: false,
        }),
      isAuthenticated: !!get()?.accessToken,
    }),
    {
      name: KEY,
      storage: createJSONStorage<SpotifyState>(() => storage),
    }
  )
)
