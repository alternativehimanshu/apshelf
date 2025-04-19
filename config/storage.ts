import * as SecureStore from 'expo-secure-store'
import { StateStorage } from 'zustand/middleware'

export const storage: StateStorage = {
    getItem: async (key: string) => {
        return await SecureStore.getItemAsync(key)
    },
    setItem: async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value)
    },
    removeItem: async (key: string) => {
        await SecureStore.deleteItemAsync(key)
    },
}
