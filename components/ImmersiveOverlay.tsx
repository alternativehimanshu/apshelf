import { themeStore } from '@/store/theme'
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { displayImmersiveOverlay as displayImmersiveOverlayAtom } from '@/store/atoms'
import { useAtom } from 'jotai'
import { Blur, Circle, size } from '@shopify/react-native-skia'
import { Group } from '@shopify/react-native-skia'
import { Canvas } from '@shopify/react-native-skia'

const ImmersiveOverlay = ({ children }: { children: React.ReactNode }) => {
  const { colors } = themeStore()
  const [displayImmersiveOverlay, setDisplayImmersiveOverlay] = useAtom(
    displayImmersiveOverlayAtom
  )
  const mountProgress = useSharedValue(0)
  // warp effect
  const intensity = 0.1

  useEffect(() => {
    mountProgress.value = withTiming(1, {
      duration: 300,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    })
    mountProgress.value = withTiming(0, {
      duration: 1500,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    })
    setTimeout(() => {
      setDisplayImmersiveOverlay(false)
    }, 1500)
  }, [])
  const progress = useDerivedValue(() => {
    if (displayImmersiveOverlay) {
      return withSequence(
        withTiming(1, {
          duration: 1500,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        }),
        withTiming(0, {
          duration: 1500,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        })
      )
    }
    return withTiming(0, {
      duration: 1500,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    })
  })
  const currentProgress = Math.max(mountProgress.value)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: opacityProgress.value,
      transform: [
        { rotateX: `${currentProgress * -5}deg` },
        { skewY: `${-currentProgress * 0.5}deg` },
        { scaleY: 1 + currentProgress * intensity },
        { scaleX: 1 - currentProgress * intensity * 0.6 },
        { translateY: currentProgress * 50 },
      ],
    }
  })

  return (
    <Animated.View
      style={[animatedStyle, { flex: 1, backgroundColor: colors.background }]}
    >
      {children}
    </Animated.View>
  )
}

export default ImmersiveOverlay

const getFadedRandomColor = () => {
  const colors = ['#ffffff', '#aaff99', '#aaddFF', '#af88ff', '#f99888']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return randomColor
}
