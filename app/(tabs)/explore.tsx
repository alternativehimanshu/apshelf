import { Pressable, RefreshControl, ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAtom } from 'jotai'
import { hideTabsAtom } from '@/store/atoms'
import { useCallback, useState } from 'react'
import { THRESHOLD } from '@/constants/misc'
import AppCard from '@/components/home/list/AppCard'
import SearchBar from '@/components/SearchBar'
import { horizontalScrollHaptic, verticalScrollHaptic } from '@/utils/haptic'
import { haptics } from '@/lib/haptics'
import { getApps } from '@/lib/api/fdroid'
import { useQuery } from '@tanstack/react-query'
import ErrorView from '@/components/ErrorView'
import LoadingScreen from '@/components/LoadingScreen'
export default function ExploreScreen() {
  const { colors } = themeStore()
  const [hideTabs, setHideTabs] = useAtom(hideTabsAtom)
  const { top } = useSafeAreaInsets()
  const [scrollY, setScrollY] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const { data, error, isLoading, refetch, isRefetching, isError } = useQuery({
    queryKey: ['apps'],
    queryFn: () => getApps(),
  })

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
    [setHideTabs, scrollY]
  )

  if (isLoading) {
    return <LoadingScreen loading={isLoading} />
  }

  if (isError) {
    return <ErrorView error={error?.message} />
  }

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={colors.textSecondary}
            style={{
              backgroundColor: colors.background,
            }}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
        contentContainerStyle={{
          minHeight: '100%',
          backgroundColor: colors.background,
          paddingHorizontal: 20,
        }}
        onScroll={handleScroll}
        // scrollEventThrottle={16}
        onMomentumScrollEnd={verticalScrollHaptic}
      >
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 12,
              marginTop: 12,
              color: colors.textSecondary,
            }}
            bold
          >
            Explore
          </Text>
          <SearchBar />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              borderRadius: 40,
              overflow: 'hidden',
            }}
            contentContainerStyle={
              {
                // paddingHorizontal: 20,
              }
            }
            onMomentumScrollEnd={horizontalScrollHaptic}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                borderRadius: 40,
                overflow: 'hidden',
                // backgroundColor: colors.surface,
              }}
            >
              {[
                'All',
                'Productivity',
                'Social',
                'Entertainment',
                'Tools',
                'Games',
                'Education',
              ].map((item) => (
                <Pressable
                  key={item}
                  android_ripple={{
                    color: colors.background,
                    foreground: true,
                  }}
                  onPress={() => {
                    setSelectedCategory(item)
                    haptics.lightest()
                  }}
                  style={{
                    overflow: 'hidden',
                    height: 42,
                    paddingHorizontal: 12,
                    backgroundColor:
                      selectedCategory === item
                        ? colors.primary
                        : colors.surface,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        selectedCategory === item
                          ? colors.text
                          : colors.textSecondary,
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'column', gap: 12 }}>
            {data && Array.isArray(data) ? (
              data.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                />
              ))
            ) : (
              <ErrorView error={'No apps found'} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
