import useAppStore from '@/store/app'
import { themeStore } from '@/store/theme'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

interface TextProps extends RNTextProps {
  children: React.ReactNode
  black?: boolean
  bold?: boolean
  semiBold?: boolean
  light?: boolean
  medium?: boolean
  regular?: boolean
  thin?: boolean
}

export const Text = ({ children, ...props }: TextProps) => {
  const { theme } = themeStore()
  const { fontFamily: fontFamilyStore } = useAppStore()
  const { black, bold, light, medium, regular, thin, semiBold } = props
  const fontFamily = () => {
    switch (fontFamilyStore) {
      case 'geist':
        if (black) return 'GeistMonoBlack'
        if (bold) return 'GeistMonoBold'
        if (semiBold) return 'GeistMonoSemiBold'
        if (light) return 'GeistMonoLight'
        if (medium) return 'GeistMonoMedium'
        if (regular) return 'GeistMonoRegular'
        if (thin) return 'GeistMonoThin'
        return 'GeistMonoRegular'
      case 'inter':
        if (black) return 'InterBlack'
        if (bold) return 'InterBold'
        if (semiBold) return 'InterSemiBold'
        if (light) return 'InterLight'
        if (medium) return 'InterMedium'
        if (regular) return 'InterRegular'
        if (thin) return 'InterThin'
        return 'InterRegular'
      case 'roboto-mono':
        if (black) return 'RobotoMonoBlack'
        if (bold) return 'RobotoMonoBold'
        if (semiBold) return 'RobotoMonoSemiBold'
        if (light) return 'RobotoMonoLight'
        if (medium) return 'RobotoMonoMedium'
        if (regular) return 'RobotoMonoRegular'
        if (thin) return 'RobotoMonoThin'
        return 'RobotoMonoRegular'
      case 'jetbrains-mono':
        if (black) return 'JetBrainsMonoBlack'
        if (bold) return 'JetBrainsMonoBold'
        if (semiBold) return 'JetBrainsMonoSemiBold'
        if (light) return 'JetBrainsMonoLight'
        if (medium) return 'JetBrainsMonoMedium'
        if (regular) return 'JetBrainsMonoRegular'
        if (thin) return 'JetBrainsMonoThin'
        return 'JetBrainsMonoRegular'
      case 'montserrat':
        if (black) return 'MontserratBlack'
        if (bold) return 'MontserratBold'
        if (semiBold) return 'MontserratSemiBold'
        if (light) return 'MontserratLight'
        if (medium) return 'MontserratMedium'
        if (regular) return 'MontserratRegular'
        if (thin) return 'MontserratThin'
        return 'MontserratRegular'
      default:
        return 'GeistMonoRegular'
    }
  }
  return (
    <RNText
      {...props}
      style={[
        {
          filter:
            //@ts-ignore
            theme === 'dark' && !props.style?.color ? 'invert(1)' : 'invert(0)',
          fontFamily: fontFamily(),
          fontSize: 16,
        },
        props.style,
      ]}
    >
      {children}
    </RNText>
  )
}
