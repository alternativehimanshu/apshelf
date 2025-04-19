import { View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
export default function ExploreScreen() {
  const { colors } = themeStore()
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text>Explore</Text>
    </View>
  )
}
