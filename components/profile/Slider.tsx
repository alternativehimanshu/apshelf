import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnUI,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Pressable, View } from 'react-native'
import { themeStore } from '@/store/theme'
import { logger } from '@/config/logger'
import { haptics } from '@/lib/haptics'

// progress type is 0% to 100%

type SliderCardProps = {
  progress: number // 0 to 100
  onProgressChange: (progress: number) => void // 0 to 100
}

const SliderCard = ({ progress, onProgressChange }: SliderCardProps) => {
  const { colors } = themeStore()

  const width = 294
  const steps = 5
  const positionX = useSharedValue(width * (progress / 100))
  const isDragging = useSharedValue(false)
  const startX = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true
      startX.value = positionX.value
    })
    .onUpdate((event) => {
      isDragging.value = true
      if (isDragging.value) {
        // console.log('dragging', event.translationX)
        const newPosition = startX.value + event.translationX
        positionX.value = Math.max(0, Math.min(width, newPosition))
      }
    })
    .onEnd(() => {
      isDragging.value = false
      const newProgress = (positionX.value / width) * 100

      // Snap to nearest step
      const stepSize = 100 / (steps - 1)
      const snappedProgress = Math.round(newProgress / stepSize) * stepSize

      positionX.value = withTiming(width * (snappedProgress / 100), {
        duration: 200,
        easing: Easing.out(Easing.quad),
      })
      runOnJS(onProgressChange)(snappedProgress)
    })

  const handleProgressChange = (snappedProgress: number) => {
    onProgressChange(snappedProgress)
  }

  useEffect(() => {
    if (!isDragging.value) {
      positionX.value = withTiming(width * (progress / 100), {
        duration: 200,
        easing: Easing.out(Easing.quad),
      })
      runOnJS(haptics.light)()
    }
  }, [progress])

  const handleStepPress = (index: number) => {
    const newProgress = index * 25
    onProgressChange(newProgress)
    positionX.value = withTiming(width * (newProgress / 100), {
      duration: 200,
      easing: Easing.out(Easing.quad),
    })
  }

  const indicateStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.get() }],
  }))

  return (
    <View
      style={{
        backgroundColor: colors.background,
        width: '95%',
        alignSelf: 'center',
        position: 'relative',
        height: 40,
        borderRadius: 50,
        marginVertical: 8,
        overflow: 'hidden',
      }}
    >
      {/* Background track */}
      {/* <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: colors.background,
        }}
      /> */}

      {/* Step indicators - placed AFTER the track to appear on top */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}
      >
        {Array.from({ length: steps }).map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handleStepPress(index)}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                progress >= index * 25 ? colors.primary : colors.textSecondary,
              zIndex: 2,
              borderWidth: 1,
              borderColor: colors.textSecondary,
            }}
          />
        ))}
      </View>

      {/* Dragging indicator */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              zIndex: 10,
              backgroundColor: colors.primary,
              borderRadius: 50,
              height: 40,
              position: 'absolute',
              width: 40,
            },
            indicateStyle,
          ]}
        />
      </GestureDetector>
    </View>
  )
}

export default SliderCard
