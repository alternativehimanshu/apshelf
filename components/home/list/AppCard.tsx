import { Text } from '@/components/ui/Text'
import { View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { themeStore } from '@/store/theme'

export type AppCardProps = {
  app: {
    id: number
    name: string
    image: string
    description: string
  }
}

export default function AppCard({ app }: AppCardProps) {
  const { colors } = themeStore()
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 32,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Pressable
        android_ripple={{ color: colors.background }}
        style={{
          flexDirection: 'row',
          // padding: 24,

          flex: 1,
          width: '100%',
          gap: 12,
          alignItems: 'center',
        }}
        onPress={() => router.push(`/app/${app.id}`)}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            padding: 14,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <Image
            source={{ uri: app.image }}
            style={{
              flex: 1,
              // margin: -10,
              borderRadius: 20,
              // backgroundColor: 'white',
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
            {app.description}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}
