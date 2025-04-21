import { Pressable, ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import RecommendCard from '@/components/home/RecommendCard'
import { useAtom } from 'jotai'
import { hideTabsAtom } from '@/store/atoms'
import { useCallback, useState } from 'react'
import { THRESHOLD } from '@/constants/misc'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import AppCard from '@/components/home/list/AppCard'
import { AppCardProps } from '@/components/home/list/AppCard'
import { verticalScrollHaptic } from '@/utils/haptic'

export const apps: AppCardProps['app'][] = [
  {
    id: 1,
    name: 'Notion',
    image:
      'https://static-00.iconduck.com/assets.00/notion-icon-256x256-g1arps9e.png',
    description:
      'The all-in-one workspace for your notes, tasks, and projects.',
  },
  {
    id: 2,
    name: 'Figma',
    image:
      'https://static-00.iconduck.com/assets.00/apps-figma-icon-2048x2048-ctjj5ab7.png',
    description: 'The best way to design and collaborate.',
  },
  {
    id: 3,
    name: 'Github',
    image:
      'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png',
    description: 'Where developers build software.',
  },
  {
    id: 4,
    name: 'Expo Go',
    image: 'https://www.cdnlogo.com/logos/e/72/expo-go-app.svg',
    description: 'Where developers build software.',
  },
  {
    id: 5,
    name: 'Google Keep',
    image: 'https://static.cdnlogo.com/logos/g/35/google-keep-icon.svg',
    description: 'Where you can write down your thoughts.',
  },
]

export default function HomeScreen() {
  const { colors } = themeStore()
  const { top } = useSafeAreaInsets()
  const [scrollY, setScrollY] = useState(0)

  const [hideTabs, setHideTabs] = useAtom(hideTabsAtom)

  const handleScroll = useCallback(
    (event: any) => {
      const currentScrollY = event.nativeEvent.contentOffset.y
      setScrollY(currentScrollY)

      // Hide tabs when scrolling down, show when scrolling up
      if (currentScrollY > scrollY && currentScrollY > THRESHOLD) {
        setHideTabs(true)
      } else if (currentScrollY < scrollY || currentScrollY < THRESHOLD) {
        setHideTabs(false)
      }
    },
    [scrollY, setScrollY, setHideTabs]
  )

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
      onScroll={handleScroll}
      // scrollEventThrottle={16}
      onScrollEndDrag={verticalScrollHaptic}
      onMomentumScrollEnd={verticalScrollHaptic}
    >
      <View style={{ flex: 1, gap: 12 }}>
        <SearchBar />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
            }}
            bold
          >
            Explore next adventure
          </Text>

          <Pressable
            onPress={() => router.push('/explore')}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: colors.surface,
            }}
          >
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        <RecommendCard />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 12,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
            }}
            bold
          >
            Suggested Apps
          </Text>
        </View>

        <View style={{ flexDirection: 'column', gap: 12 }}>
          {apps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
