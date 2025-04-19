import { Pressable, View } from 'react-native'
import { Text } from '../ui/Text'
import { themeStore } from '@/store/theme'
import { MaterialIcons } from '@expo/vector-icons'
export default function RecommendCard() {
  const { colors } = themeStore()
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 40,
        padding: 10,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ gap: 4, flex: 1, marginLeft: 16 }}>
        <Text
          style={{
            fontSize: 14,
            color: colors.text,
          }}
          bold
        >
          Creator's collection
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: colors.textSecondary,
          }}
        >
          Explore the best of the best
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 100,
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Pressable
          android_ripple={{ color: colors.primary }}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={colors.text}
          />
        </Pressable>
      </View>
    </View>
  )
}
