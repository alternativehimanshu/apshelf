import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { storage } from '@/config/storage'

export type FontFamily = 'geist' | 'inter' | 'roboto-mono' | 'jetbrains-mono' | 'montserrat'
export type Haptic = 0 | 1 | 2 | 3 | 4

interface AppStore {
    isOnboarded: boolean
    fontFamily: FontFamily
    haptic: Haptic
    setIsOnboarded: (isOnboarded: boolean) => void
    setFontFamily: (fontFamily: FontFamily) => void
    setHaptic: (haptic: Haptic) => void
}

const useAppStore = create<AppStore>()(
    persist((set) => ({
        isOnboarded: false,
        fontFamily: 'geist',
        haptic: 2,
        setIsOnboarded: (isOnboarded: boolean) => set({ isOnboarded }),
        setFontFamily: (fontFamily: FontFamily) => set({ fontFamily }),
        setHaptic: (haptic: Haptic) => set({ haptic }),
    }),
        {
            name: 'app-storage', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => storage), // (optional) by default, 'localStorage' is used
        },
    )
)

export default useAppStore