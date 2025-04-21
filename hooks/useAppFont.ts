import { useFonts } from "expo-font"

export const useAppFont = () => {

    const [fontsLoaded] = useFonts({
        GeistMonoBlack: require('../assets/fonts/geist/GeistMono-Black.ttf'),
        GeistMonoSemiBold: require('../assets/fonts/geist/GeistMono-SemiBold.ttf'),
        GeistMonoBold: require('../assets/fonts/geist/GeistMono-Bold.ttf'),
        GeistMonoMedium: require('../assets/fonts/geist/GeistMono-Medium.ttf'),
        GeistMonoRegular: require('../assets/fonts/geist/GeistMono-Regular.ttf'),
        GeistMonoLight: require('../assets/fonts/geist/GeistMono-Light.ttf'),
        GeistMonoThin: require('../assets/fonts/geist/GeistMono-Thin.ttf'),

        InterBlack: require('../assets/fonts/inter/Inter_18pt-Black.ttf'),
        InterSemiBold: require('../assets/fonts/inter/Inter_18pt-SemiBold.ttf'),
        InterBold: require('../assets/fonts/inter/Inter_18pt-Bold.ttf'),
        InterMedium: require('../assets/fonts/inter/Inter_18pt-Medium.ttf'),
        InterRegular: require('../assets/fonts/inter/Inter_18pt-Regular.ttf'),
        InterLight: require('../assets/fonts/inter/Inter_18pt-Light.ttf'),
        InterThin: require('../assets/fonts/inter/Inter_18pt-Thin.ttf'),

        RobotoMonoBlack: require('../assets/fonts/roboto-mono/RobotoMono-Bold.ttf'),
        RobotoMonoSemiBold: require('../assets/fonts/roboto-mono/RobotoMono-SemiBold.ttf'),
        RobotoMonoBold: require('../assets/fonts/roboto-mono/RobotoMono-Bold.ttf'),
        RobotoMonoMedium: require('../assets/fonts/roboto-mono/RobotoMono-Medium.ttf'),
        RobotoMonoRegular: require('../assets/fonts/roboto-mono/RobotoMono-Regular.ttf'),
        RobotoMonoLight: require('../assets/fonts/roboto-mono/RobotoMono-Light.ttf'),
        RobotoMonoThin: require('../assets/fonts/roboto-mono/RobotoMono-Thin.ttf'),

        JetBrainsMonoBlack: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Black.ttf'),
        JetBrainsMonoSemiBold: require('../assets/fonts/jetbrains-mono/JetBrainsMono-SemiBold.ttf'),
        JetBrainsMonoBold: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Bold.ttf'),
        JetBrainsMonoMedium: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Medium.ttf'),
        JetBrainsMonoRegular: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Regular.ttf'),
        JetBrainsMonoLight: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Light.ttf'),
        JetBrainsMonoThin: require('../assets/fonts/jetbrains-mono/JetBrainsMono-Thin.ttf'),

        MontserratBlack: require('../assets/fonts/montserrat/Montserrat-Black.ttf'),
        MontserratSemiBold: require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
        MontserratBold: require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
        MontserratMedium: require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
        MontserratRegular: require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
        MontserratLight: require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
        MontserratThin: require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
    })

    return {
        fontsLoaded,
    }
}
