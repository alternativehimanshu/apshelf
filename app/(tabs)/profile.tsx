import { ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProfileContainer from '@/components/profile/ProfileContainer'
import TrayCard, { TrayCardItem } from '@/components/profile/TrayCard'
import { logger } from '@/config/logger'
import useAppStore, { FontFamily, Haptic } from '@/store/app'
import { useAtom } from 'jotai'
import { hideTabsAtom } from '@/store/atoms'
import { useCallback, useState } from 'react'
import { THRESHOLD } from '@/constants/misc'
import { fontFamilies, hapticOptions } from '@/config/setting'
import { verticalScrollHaptic } from '@/utils/haptic'

export default function ProfileScreen() {
  const { fontFamily: fontFamilyStore, setFontFamily } = useAppStore()
  const { haptic: hapticStore, setHaptic } = useAppStore()
  const { colors, setThemeSystem, setThemeUser, theme, preferrence } =
    themeStore()
  const { top } = useSafeAreaInsets()
  const [hideTabs, setHideTabs] = useAtom(hideTabsAtom)
  const [scrollY, setScrollY] = useState(0)

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

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingHorizontal: 20,
          gap: 12,
        }}
        onScroll={handleScroll}
        onScrollEndDrag={verticalScrollHaptic}
        onMomentumScrollEnd={verticalScrollHaptic}
      >
        <Text
          style={{
            fontSize: 24,
            marginBottom: 12,
            marginTop: 12,
            color: colors.textSecondary,
          }}
          bold
        >
          Profile
        </Text>
        <ProfileContainer />
        {/* Theme */}

        <TrayCard
          title="Theme"
          description="Change the theme of the app"
          icon="palette"
          items={[
            { title: 'Light', value: 'light' },
            { title: 'Dark', value: 'dark' },
            { title: 'System', value: 'system' },
          ]}
          onPress={(item) => {
            logger.log(`setting theme`, item)
            if (item === 'system') {
              setThemeSystem(item.toLowerCase() as 'light' | 'dark' | 'system')
            } else {
              setThemeUser(item.toLowerCase() as 'light' | 'dark')
            }
          }}
          selected={
            preferrence === 'system'
              ? 'system'
              : preferrence === 'user'
              ? theme === 'dark'
                ? 'dark'
                : 'light'
              : 'system'
          }
        />
        {/* Font */}
        <TrayCard
          title="Font"
          description="Change the font of the app"
          icon="font-download"
          items={fontFamilies}
          onPress={(item) => {
            setFontFamily(item)
          }}
          selected={fontFamilyStore}
        />
        {/* Haptics */}
        <TrayCard
          title="Haptics"
          type="slider"
          description="Change the haptic feedback of the app"
          icon="hardware"
          items={hapticOptions}
          onPress={(item) => {
            // convert from 0-100 to 0-4
            setHaptic((item / 25) as Haptic)
            logger.log('haptic', item)
          }}
          selected={hapticStore * 25}
        />
      </ScrollView>
    </View>
  )
}
