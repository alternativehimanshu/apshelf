import { View } from 'react-native'
import { themeStore } from '@/store/theme'
import { Text } from '../ui/Text'

export default function ProfileContainer() {
  const { colors } = themeStore()
  return (
    <View
      style={{
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          height: 140,
          width: 140,
          backgroundColor: colors.primary,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: 12,
          elevation: 15,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 59,
        }}
      >
        <ProfileIcon name="H" />
      </View>
    </View>
  )
}

const ProfileIcon = ({ name }: { name: string }) => {
  const { colors } = themeStore()
  return (
    <View>
      <Text
        style={{
          fontSize: 72,
          color: colors.text,
        }}
        black
      >
        {name}
      </Text>
    </View>
  )
}
