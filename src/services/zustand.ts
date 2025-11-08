import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { StateStorage } from 'zustand/middleware'

export const createStorage = (id: string) => {
  const storage: StateStorage = {
    getItem: (name) => getItemAsync(`${id}-${name}`),
    setItem: (name, value) => setItemAsync(`${id}-${name}`, value),
    removeItem: (name) => deleteItemAsync(`${id}-${name}`),
  }
  return storage
}

type Store = {
  persist: {
    hasHydrated: () => boolean
    onFinishHydration: (fn: () => void) => () => void
  }
}
export const useIsHydrated = (store: Store) => {
  const [isHydrated, setIsHydrated] = useState(store.persist.hasHydrated)

  useEffect(() => {
    const unsubscribe = store.persist.onFinishHydration(() => setIsHydrated(true))
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isHydrated
}
