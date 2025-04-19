import { router, Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Dimensions, Pressable, Vibration, View } from 'react-native'
import { themeStore } from '@/store/theme'
import { useRouter } from 'expo-router'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useLayoutEffect } from 'react'
import * as Haptic from 'expo-haptics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { haptics } from '@/lib/haptics'

const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
      }}
    >
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
  href: string
  isActive: boolean
  index: number
}) => {
  const router = useRouter()
  const { colors } = themeStore()

  const translateY = useSharedValue(-10)

  useLayoutEffect(() => {
    translateY.value = withSpring(0, { duration: 700 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translateY.value * (index + 3) * 5 }],
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
          haptics.light()
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
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
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
            tabBarIcon: ({ color, size }) => (
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
            tabBarIcon: ({ color, size }) => (
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
