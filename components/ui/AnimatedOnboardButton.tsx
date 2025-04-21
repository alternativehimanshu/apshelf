import { Pressable, View } from 'react-native'
import { Text } from './Text'
import { themeStore } from '@/store/theme'
import { MaterialIcons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated'

export default function AnimatedOnboardButton({
  onPress,
}: {
  onPress: () => void
}) {
  const { colors } = themeStore()

  const progress = useDerivedValue(() => {
    return withSequence(
      withTiming(100, {
        duration: 0,
        easing: Easing.bezier(0.56, 0, 0.31, 0.99),
      }),
      withTiming(1, {
        duration: 300,
        easing: Easing.bezier(1, 0, 0, 0.99),
      })
    )
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: progress.value },
        {
          translateY: 0 - progress.value * 0.5,
        },
      ],
      opacity: progress.value,
    }
  })

  return (
    <Animated.View
      style={[
        animatedStyle,
        { zIndex: 100, position: 'absolute', bottom: 50, right: 50 },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={{
          height: 100,
          width: 100,
          zIndex: 100,
          backgroundColor: colors.primary,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color={colors.text}
        />
      </Pressable>
    </Animated.View>
  )
}
