// ThemeProvider.js
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { themeStore } from '@/store/theme'
import { logger } from '@/config/logger'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme()
  const { setThemeSystem, setThemeUser, theme, preferrence } = themeStore()

  // Initialize theme based on device settings
  useEffect(() => {
    if (preferrence === 'system') {
      setThemeSystem(colorScheme === 'dark' ? 'dark' : 'light')
    } else {
      setThemeUser(theme)
    }
  }, [colorScheme])

  return children
}

export default ThemeProvider
