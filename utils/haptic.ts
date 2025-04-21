import { haptics } from "@/lib/haptics"

export const horizontalScrollHaptic = (event: any) => {
    const isAtStart = event.nativeEvent.contentOffset.x <= 0
    const isAtEnd =
        event.nativeEvent.contentOffset.x >=
        event.nativeEvent.contentSize.width -
        event.nativeEvent.layoutMeasurement.width - 0.5

    if (isAtStart || isAtEnd) {
        haptics.light()
    }
}

export const verticalScrollHaptic = (event: any) => {
    const isAtStart = event.nativeEvent.contentOffset.y <= 0
    const isAtEnd =
        event.nativeEvent.contentOffset.y >=
        event.nativeEvent.contentSize.height -
        event.nativeEvent.layoutMeasurement.height - 0.5

    console.log(isAtStart, isAtEnd)

    if (isAtStart || isAtEnd) {
        haptics.lightest()
    }
}
