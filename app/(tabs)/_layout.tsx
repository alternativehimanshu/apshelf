import { Route, router, Tabs } from 'expo-router'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { Dimensions, Pressable, Vibration, View } from 'react-native'
import { themeStore } from '@/store/theme'
import { useRouter } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useLayoutEffect, useEffect } from 'react'
import * as Haptic from 'expo-haptics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { haptics } from '@/lib/haptics'
import { useAtomValue } from 'jotai'
import { hideTabsAtom } from '@/store/atoms'

const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props
  return (
    <View style={{}}>
      <TabItem
        href="/"
        index={0}
        isActive={state.index === 0}
        icon="home"
      />
      <TabItem
        href="/explore"
        index={1}
        isActive={state.index === 1}
        icon="explore"
      />
      <TabItem
        href="/profile"
        index={2}
        isActive={state.index === 2}
        icon="person"
      />
    </View>
  )
}

const TabItem = ({
  icon,
  href,
  isActive,
  index,
}: {
  icon: string
  href: Route
  isActive: boolean
  index: number
}) => {
  const router = useRouter()
  const { colors } = themeStore()
  const translateY = useSharedValue(-100)
  const rotate = useSharedValue(0)

  const hideTabs = useAtomValue(hideTabsAtom)

  useEffect(() => {
    translateY.value = withTiming(hideTabs ? -140 : 0, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    })
  }, [hideTabs])

  useEffect(() => {
    translateY.value = withSpring(0, {
      // duration: 1500,
      damping: 80,
      stiffness: 100,
    })
  }, [])

  useEffect(() => {
    if (isActive) {
      rotate.value = withSequence(
        withTiming(0, { duration: 20 }),
        withTiming(20, { duration: 30 }),
        withTiming(-20, { duration: 30 }),
        withTiming(20, { duration: 30 }),
        withTiming(-20, { duration: 30 }),
        withTiming(0, { duration: 100 })
      )
    }
  }, [isActive])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -translateY.value * (index + 1) },
        { rotate: `${rotate.value}deg` },
      ],
    }
  })

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: 10,
          zIndex: 100,
          left: index * 88 + Dimensions.get('window').width / 5,
          height: 80,
          width: 80,
          backgroundColor: isActive ? colors.primary : colors.surface,
          borderRadius: 100,
          elevation: 20,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 50 },
          shadowOpacity: 0.05,
          shadowRadius: 3.84,
        },
      ]}
    >
      <Pressable
        android_ripple={{ color: colors.background, borderless: true }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          router.push(href)
          haptics.medium()
        }}
      >
        <MaterialIcons
          name={icon as any}
          size={24}
          color={isActive ? colors.text : colors.textSecondary}
        />
      </Pressable>
    </Animated.View>
  )
}

export default function TabsLayout() {
  const { colors } = themeStore()
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: bottom,
      }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <Tabs
        tabBar={TabBar}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(home)/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <MaterialIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <MaterialIcons
                name="explore"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <MaterialIcons
                name="person"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
      {/* </TouchableWithoutFeedback> */}
    </View>
  )
}
