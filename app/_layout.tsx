import { router, Stack, useRouter } from 'expo-router'
import { themeStore } from '@/store/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect, useState } from 'react'
import ThemeProvider from '@/lib/ThemeProvider'
import { useAppFont } from '@/hooks/useAppFont'
import useAppStore from '@/store/app'
import LoadingScreen from '@/components/LoadingScreen'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

function RootLayoutNav() {
  const { colors, setThemeSystem, theme } = themeStore()
  const { isOnboarded } = useAppStore()

  const isDark = theme === 'dark'
  const [isReady, setIsReady] = useState(false)

  const { fontsLoaded } = useAppFont()

  useEffect(() => {
    NavigationBar.setBorderColorAsync('rgba(0,0,0,0)')
    NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0)')
    NavigationBar.setButtonStyleAsync('dark')
    NavigationBar.setPositionAsync('absolute')
    NavigationBar.setBehaviorAsync('overlay-swipe')
  }, [])

  useEffect(() => {
    const checkOnboarding = async () => {
      if (isOnboarded) {
        router.replace('/(tabs)')
      } else {
        router.replace('/')
      }
      setIsReady(true)
    }

    setIsReady(true)

    checkOnboarding()

    SplashScreen.hideAsync()
  }, [])

  if (!fontsLoaded || !isReady) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: isDark ? 'light' : 'dark',
              statusBarBackgroundColor: colors.background,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GestureHandlerRootView>
      </View>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return <RootLayoutNav />
}
