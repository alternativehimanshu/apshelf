import { Dimensions, Pressable, View } from 'react-native'
import { themeStore } from '@/store/theme'
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Text } from './ui/Text'
import { haptics } from '@/lib/haptics'

const SEARCH_BAR_WIDTH = Dimensions.get('window').width - 110

export default function SearchBar() {
  const { colors } = themeStore()
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const width = useSharedValue(SEARCH_BAR_WIDTH)

  const opacity = useSharedValue(0)
  const padding = useSharedValue(0)
  const height = useSharedValue(60)

  const animatedStyleInner = useAnimatedStyle(() => {
    return {
      width: width.value,
    }
  })

  const animatedStyleOuter = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      padding: padding.value,
      height: height.value,
      //   display: isFocused ? 'flex' : 'none',
    }
  })

  const handleFocus = () => {
    setIsFocused(true)
    haptics.heavy()
    width.value = withSpring(260, { duration: 600 })

    opacity.value = withTiming(1, { duration: 100 })
    padding.value = withSpring(20, { duration: 1000 })
    height.value = withSpring(560, { duration: 1000 })
  }

  const handleBlur = () => {
    setIsFocused(false)
    haptics.light()
    width.value = withSpring(SEARCH_BAR_WIDTH, {
      duration: 600,
    })

    opacity.value = withTiming(0, { duration: 100 })
    padding.value = withSpring(0, { duration: 1000 })
    height.value = withSpring(60, { duration: 1000 })
  }

  const handleChangeText = (text: string) => {
    setSearch(text)
    setIsSearching(text.length > 0)
  }

  const handleSubmit = () => {}

  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        marginTop: 10,
      }}
    >
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderRadius: 50,
            zIndex: 10,
            height: 60,
            overflow: 'hidden',
          },
          useAnimatedStyle(() => {
            return {
              marginTop: withSpring(isFocused ? 20 : 0, { duration: 300 }),
            }
          }),
        ]}
      >
        <Animated.View style={[animatedStyleInner]}>
          <TextInput
            // blur on back swipe
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={search}
            returnKeyType="search"
            onSubmitEditing={handleSubmit}
            placeholder="Search"
            placeholderTextColor={colors.textSecondary}
            style={{
              backgroundColor: colors.surface,
              color: colors.text,
              fontFamily: 'GeistMonoRegular',
              fontSize: 16,
              borderRadius: 100,
              height: 60,
              paddingHorizontal: 20,
            }}
            inputMode="search"
          />
        </Animated.View>
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 100,
          }}
        >
          <Pressable
            android_ripple={{ color: '#0001', borderless: true }}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 100,
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="search"
              size={24}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
            alignItems: 'center',
            borderRadius: 50,
            height: 60,
            width: '100%',
            backgroundColor: colors.primary,
          },
          animatedStyleOuter,
        ]}
      >
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 30,
            flex: 1,
            marginTop: 80,
            width: '100%',
          }}
        >
          <Text
            bold
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: '50%',
              opacity: 0.5,
            }}
          >
            No results found
          </Text>
        </View>
      </Animated.View>
    </View>
  )
}
