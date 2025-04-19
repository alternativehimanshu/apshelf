import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeStore } from '@/store/theme'
import { Text } from '@/components/ui/Text'
import { useAtom } from 'jotai'
import ImmersiveOverlay from '@/components/ImmersiveOverlay'
import { displayImmersiveOverlay as displayImmersiveOverlayAtom } from '@/store/atoms'
import { useEffect } from 'react'
import AnimatedOnboardButton from '@/components/ui/AnimatedOnboardButton'
export default function OnboardingScreen() {
  const { colors } = themeStore()
  const [displayImmersiveOverlay, setDisplayImmersiveOverlay] = useAtom(
    displayImmersiveOverlayAtom
  )
  useEffect(() => {
    setDisplayImmersiveOverlay(true)
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ImmersiveOverlay>
        <View
          style={{
            flex: 1,
            padding: 20,
            // borderWidth: 1,
            borderColor: 'red',
          }}
        >
          <Text
            black
            style={{
              fontSize: 100,
              marginTop: 100,
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 44,
              marginTop: 10,
              color: colors.textSecondary,
            }}
            bold
          >
            The art of discovering apps.
          </Text>
          {/* <Text
          style={{
            fontSize: 14,
            marginTop: 10,
          }}
          light
        >
            Discover, evolve, explore.
          </Text> */}
          <AnimatedOnboardButton />
        </View>
      </ImmersiveOverlay>
    </SafeAreaView>
  )
}
