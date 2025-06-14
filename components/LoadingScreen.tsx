import { View } from 'react-native'
import Loading from './Loading'
import { themeStore } from '@/store/theme'
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated'

export default function LoadingScreen({ loading }: { loading: boolean }) {
  const { colors } = themeStore()

  if (!loading) return null

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
      <Loading />
    </Animated.View>
  )
}
