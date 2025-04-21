import { App } from '@/models/v1'
import { atom } from 'jotai'

export const displayImmersiveOverlay = atom(false)

export const hideTabsAtom = atom(false)

export const selectedAppAtom = atom<App | null>(null)