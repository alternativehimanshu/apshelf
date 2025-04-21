import useAppStore from '@/store/app'
import { Vibration } from 'react-native'


export const hapticOptions = {

    lightest: 1,
    light: 2,
    medium: 13,
    strong: 16,
    tactile: [1, 1, 1, 1, 1],
    heavy: [1, 1, 1, 1, 1, 1, 1, 1],
}

export const haptics = {
    lightest: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.lightest * haptic)
        }
    },
    light: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.light * haptic)
        }
    },
    medium: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.medium * haptic)
        }
    },
    strong: () => {
        const haptic = useAppStore.getState().haptic
        if (haptic > 0) {
            Vibration.vibrate(hapticOptions.strong * haptic)
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
