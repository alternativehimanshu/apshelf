import { logger } from "@/config/logger"
import { storage } from "@/config/storage"
import { Colors } from "@/constants/Colors"
import { Appearance, useColorScheme } from "react-native"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"



interface ThemeStore {
    theme: 'light' | 'dark'
    preferrence: 'system' | 'user'
    colors: typeof Colors.light | typeof Colors.dark
    isDark: boolean
    setThemeUser: (theme: 'light' | 'dark') => void
    setThemeSystem: (theme: 'light' | 'dark' | 'system') => void
}

export const themeStore = create<ThemeStore>()(persist((set) => ({

    theme: 'light',
    preferrence: 'system',
    colors: Colors.light,
    isDark: false,
    setThemeUser: (theme: 'light' | 'dark') => {
        set({
            theme: theme,
            isDark: theme === 'dark',
            colors: theme === 'light' ? Colors.light : Colors.dark,
            preferrence: 'user',
        })
    },
    setThemeSystem: (theme: 'light' | 'dark' | 'system') => {
        if (theme === 'system') {
            const systemTheme = Appearance.getColorScheme()
            logger.log('systemTheme asdfs adfsad', systemTheme)
            set({
                theme: systemTheme === 'dark' ? 'dark' : 'light',
                isDark: systemTheme === 'dark',
                colors: systemTheme === 'light' ? Colors.light : Colors.dark,
                preferrence: 'system',
            })
        } else {
            set({
                theme: theme,
                isDark: theme === 'dark',
                colors: theme === 'light' ? Colors.light : Colors.dark,
                preferrence: 'system',
            })
        }
    },
}), {
    name: 'theme',
    storage: createJSONStorage(() => storage),
}))
