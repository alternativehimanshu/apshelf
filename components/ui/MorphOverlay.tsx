import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { Gyroscope } from 'expo-sensors'

const MorphOverlay = ({ children }: { children: React.ReactNode }) => {
  const warpProgress = useSharedValue(0)
  const scale = useSharedValue(1)
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const rotateZ = useSharedValue(0)

  const warpConfig = {
    duration: 800,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  }

  const warpGesture = Gesture.Pan()
    .onUpdate((e) => {
      warpProgress.value = withTiming(e.translationX / 150, warpConfig)
      scale.value = withSpring(1 - Math.abs(e.translationX) / 400)
    })
    .onEnd(() => {
      warpProgress.value = withTiming(0, warpConfig)
      scale.value = withSpring(1)
    })

  const animatedWarp = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 1200,
      },
      {
        rotateX: warpProgress.value * 10 + 'deg',
      },
      {
        rotateY: warpProgress.value * 40 + 'deg',
      },
      {
        rotateZ: warpProgress.value * 10 + 'deg',
      },
      {
        scale: scale.value + rotateX.value * 0.01,
      },
      {
        skewX: rotateX.value + 'deg',
      },
      {
        translateX: warpProgress.value * 150,
      },
      {
        translateY: warpProgress.value * 150,
      },
    ],
    borderRadius: withTiming(
      `${Math.abs(warpProgress.value * 40)}%`,
      warpConfig
    ),
    opacity: withTiming(1 - Math.abs(warpProgress.value * 0.5), warpConfig),
  }))

  useEffect(() => {
    Gyroscope.setUpdateInterval(5)

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      // Convert gyroscope data to degrees and apply with smoothing
      rotateX.value = withSpring(gyroscopeData.x * 20, { damping: 20 })
      rotateY.value = withSpring(gyroscopeData.y * 20, { damping: 20 })
      rotateZ.value = withSpring(gyroscopeData.z * 20, { damping: 20 })
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <GestureDetector gesture={warpGesture}>
      <Animated.View
        style={[
          {
            // backgroundColor: 'red',
            flex: 1,
            borderWidth: 5,
            borderRadius: 100,
            borderColor: 'rgba(255, 255, 255, 0.1)  ',
          },
          animatedWarp,
        ]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export default MorphOverlay
