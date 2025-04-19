import { ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/Text'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProfileContainer from '@/components/profile/ProfileContainer'
import TrayCard, { TrayCardItem } from '@/components/profile/TrayCard'
import { logger } from '@/config/logger'
import useAppStore, { FontFamily, Haptic } from '@/store/app'

const hapticOptions: TrayCardItem<Haptic>[] = [
  { title: '0', value: 0 },
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
]

export default function ProfileScreen() {
  const { fontFamily: fontFamilyStore, setFontFamily } = useAppStore()
  const { haptic: hapticStore, setHaptic } = useAppStore()
  const fontFamilies: TrayCardItem<FontFamily>[] = [
    { title: 'Geist', value: 'geist' },
    { title: 'Inter', value: 'inter' },
    { title: 'Roboto Mono', value: 'roboto-mono' },
    { title: 'JetBrains Mono', value: 'jetbrains-mono' },
    { title: 'Montserrat', value: 'montserrat' },
  ]
  const { colors, setThemeSystem, setThemeUser, theme, preferrence } =
    themeStore()
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
        // paddingBottom: 100,
      }}
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
          Profile
        </Text>
        {/* <ProfileContainer /> */}
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
      </View>
    </ScrollView>
  )
}
