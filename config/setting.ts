import { Haptic } from "@/store/app"
import { TrayCardItem } from "@/components/profile/TrayCard"
import { FontFamily } from "@/store/app"

export const hapticOptions: TrayCardItem<Haptic>[] = [
    { title: '0', value: 0 },
    { title: '1', value: 1 },
    { title: '2', value: 2 },
    { title: '3', value: 3 },
    { title: '4', value: 4 },
]

export const fontFamilies: TrayCardItem<FontFamily>[] = [
    { title: 'Geist', value: 'geist' },
    { title: 'Inter', value: 'inter' },
    { title: 'Roboto Mono', value: 'roboto-mono' },
    { title: 'JetBrains Mono', value: 'jetbrains-mono' },
    { title: 'Montserrat', value: 'montserrat' },
] 