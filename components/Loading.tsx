import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { themeStore } from '@/store/theme'
import { useEffect } from 'react'

export default function Loading() {
  const { colors } = themeStore()
  const progress = useSharedValue(0)
  const rotate = useSharedValue(0)
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: progress.value * 1.75 },
        { translateY: progress.value * 1.25 },
      ],
    }
  })
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: progress.value * 1.25 },
        { translateX: progress.value * -1.75 },
      ],
    }
  })
  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: progress.value * -2 },
        { translateX: progress.value * 0 },
      ],
    }
  })

  const animatedStyle4 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    }
  })

  useEffect(() => {
    progress.value = 6
    progress.value = withRepeat(
      withTiming(10, {
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      }),
      -1,
      true
    )
    rotate.value = 0
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1, // -1 means infinite repetition
      false // don't reverse the animation
    )
  }, [])

  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: 36,
          width: 36,
          padding: 10,
          borderRadius: 48,
          backgroundColor: colors.text,
        },
        animatedStyle4,
      ]}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 36,
            width: 36,
            borderRadius: 50,
            backgroundColor: colors.text,
          },
          animatedStyle1,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 36,
            width: 36,
            borderRadius: 50,
            backgroundColor: colors.text,
          },
          animatedStyle2,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 36,
            width: 36,
            borderRadius: 50,
            backgroundColor: colors.text,
          },
          animatedStyle3,
        ]}
      />
    </Animated.View>
  )
}
