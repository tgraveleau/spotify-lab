import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createStorage } from '$services/zustand'

interface SpotifyState {
  accessToken?: string
  refreshToken?: string
  tokenType?: string
  login: (accessToken: string, refreshToken: string, tokenType: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const KEY = 'auth'
const storage = createStorage(KEY)
export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set, get) => ({
      accessToken: undefined,
      refreshToken: undefined,
      tokenType: undefined,
      login: (accessToken, refreshToken, tokenType) =>
        set({ accessToken, refreshToken, tokenType }),
      logout: () => set({ accessToken: undefined, refreshToken: undefined, tokenType: undefined }),
      isAuthenticated: !!get()?.accessToken,
    }),
    {
      name: KEY,
      storage: createJSONStorage<SpotifyState>(() => storage),
    }
  )
)
