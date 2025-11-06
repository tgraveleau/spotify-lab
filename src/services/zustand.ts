import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'
import { StateStorage } from 'zustand/middleware'

export const createStorage = (id: string) => {
  const storage: StateStorage = {
    getItem: (name) => getItemAsync(`${id}-${name}`),
    setItem: (name, value) => setItemAsync(`${id}-${name}`, value),
    removeItem: (name) => deleteItemAsync(`${id}-${name}`),
  }
  return storage
}
