import { ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import RecommendCard from '@/components/home/RecommendCard'
export default function HomeScreen() {
  const { colors } = themeStore()
  const { top } = useSafeAreaInsets()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        minHeight: '100%',
        backgroundColor: colors.background,
        paddingTop: top,
        paddingHorizontal: 20,
        paddingBottom: 100,
      }}
    >
      <View style={{ flex: 1, gap: 12 }}>
        <SearchBar />
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            color: colors.textSecondary,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: colors.textSecondary,
          }}
          bold
        >
          Find your next adventure
        </Text>
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </View>
    </ScrollView>
  )
}
