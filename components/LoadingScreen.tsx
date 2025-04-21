import { View } from 'react-native'
import Loading from './Loading'
import { themeStore } from '@/store/theme'

export default function LoadingScreen() {
  const { colors } = themeStore()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Loading />
    </View>
  )
}
