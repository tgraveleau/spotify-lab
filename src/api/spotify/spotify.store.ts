import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createStorage } from '$services/zustand'

interface SpotifyState {
  accessToken?: string
  refreshToken?: string
  tokenType?: string
}

const KEY = 'auth'
const storage = createStorage(KEY)
export const spotifyStore = create<SpotifyState>()(
  persist(
    (set, get) => ({
      accessToken: undefined,
      refreshToken: undefined,
      tokenType: undefined,
    }),
    {
      name: KEY,
      storage: createJSONStorage<SpotifyState>(() => storage),
    }
  )
)
