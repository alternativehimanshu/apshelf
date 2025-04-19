import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Keyboard, View } from 'react-native'
import { themeStore } from '@/store/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import ThemeProvider from '@/lib/ThemeProvider'
import { useAppFont } from '@/hooks/useAppFont'

function RootLayoutNav() {
  const { colors, setThemeSystem, theme } = themeStore()
  const isDark = theme === 'dark'

  useEffect(() => {
    NavigationBar.setBorderColorAsync('rgba(0,0,0,0)')
    NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0)')
    NavigationBar.setButtonStyleAsync('dark')
    NavigationBar.setPositionAsync('absolute')
    NavigationBar.setBehaviorAsync('overlay-swipe')
  }, [])

  useAppFont()

  return (
    <ThemeProvider>
      <>
        {/* <StatusBar
          // animated
          backgroundColor={colors.background}
          // translucent
          style={isDark ? 'light' : 'dark'}
        /> */}
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
      </>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return <RootLayoutNav />
}
