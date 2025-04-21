import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import { Text } from './ui/Text'
import { themeStore } from '@/store/theme'
import { MaterialIcons } from '@expo/vector-icons'
export default function BackButton() {
  const { colors } = themeStore()
  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: 100,
        backgroundColor: colors.surface,
        width: 52,
        height: 52,
      }}
    >
      <Pressable
        android_ripple={{ color: colors.ripple }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => router.back()}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={colors.text}
        />
      </Pressable>
    </View>
  )
}
