import { Text } from '@/components/ui/Text'
import { View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { themeStore } from '@/store/theme'
import { App } from '@/models/v1'
import { selectedAppAtom } from '@/store/atoms'
import { useSetAtom } from 'jotai'

export type AppCardProps = {
  app: App
}

export default function AppCard({ app }: AppCardProps) {
  const { colors } = themeStore()
  const router = useRouter()
  const setSelectedApp = useSetAtom(selectedAppAtom)

  const handlePress = () => {
    setSelectedApp(app)

    setTimeout(() => {
      router.push({
        pathname: '/(app)/[appId]',
        params: {
          appId: app.id,
        },
      })
    }, 100)
  }

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 48,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Pressable
        android_ripple={{ color: colors.ripple }}
        style={{
          flexDirection: 'row',
          // padding: 24,

          flex: 1,
          width: '100%',
          gap: 12,
          padding: 10,
          alignItems: 'center',
        }}
        onPress={handlePress}
      >
        <View
          style={{
            width: 92,
            height: 92,
            borderRadius: 100,
            padding: 10,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <Image
            source={{ uri: app.icon }}
            style={{
              flex: 1,
              borderRadius: 20,
              objectFit: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            gap: 4,
            // padding: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {app.name}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
            }}
          >
            {app.localized?.['en-US']?.summary}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}
