import { themeStore } from '@/store/theme'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useEffect } from 'react'
import { Text } from './ui/Text'

export default function ErrorView({ error }: { error: string }) {
  const { colors } = themeStore()

  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
      exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 14,
          color: colors.textSecondary,
        }}
      >
        Error: {error}
      </Text>
    </Animated.View>
  )
}
