import useAppStore from '@/store/app'
import { Vibration } from 'react-native'


export const hapticOptions = {
    light: [1, 1, 1],
    medium: [1, 1, 1, 1],
    tactile: [1, 1, 1, 1, 1, 1, 1],
    heavy: [1, 1, 1, 1, 1, 1, 1, 1],
}

export const haptics = {
    light: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.light.map((v) => v * haptic))
        }
    },
    medium: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.medium.map((v) => v * haptic))
        }
    },
    tactile: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.tactile.map((v) => v * haptic))
        }
    },
    heavy: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.heavy.map((v) => v * haptic))
        }
    },
}
