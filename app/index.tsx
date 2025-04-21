import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeStore } from '@/store/theme'
import { Text } from '@/components/ui/Text'
import ImmersiveOverlay from '@/components/ImmersiveOverlay'
import AnimatedOnboardButton from '@/components/ui/AnimatedOnboardButton'
import useAppStore from '@/store/app'
import { Redirect, router } from 'expo-router'

export default function OnboardingScreen() {
  const { colors } = themeStore()
  const { isOnboarded, setIsOnboarded } = useAppStore()
  // const router = useRouter()

  if (isOnboarded) {
    return <Redirect href="/(tabs)" />
  }

  const handleOnboard = () => {
    setIsOnboarded(true)
    router.replace('/(tabs)')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ImmersiveOverlay>
        <View
          style={{
            flex: 1,
            padding: 20,
            // borderWidth: 1,
            // borderColor: 'red',
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
          <AnimatedOnboardButton onPress={handleOnboard} />
        </View>
      </ImmersiveOverlay>
    </SafeAreaView>
  )
}
