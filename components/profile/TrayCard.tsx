import { Pressable, Vibration, View } from 'react-native'
import { Text } from '../ui/Text'
import { themeStore } from '@/store/theme'
import { MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'

import Animated, {
  Easing,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import { logger } from '@/config/logger'
import { haptics } from '@/lib/haptics'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import SliderCard from './Slider'

export type TrayCardItem<T> = {
  title: string
  value: T
}

interface TrayCardProps<T> {
  title: string
  description: string
  icon: keyof typeof MaterialIcons.glyphMap
  items: TrayCardItem<T>[]
  onPress: (item: TrayCardItem<T>['value']) => void
  selected: TrayCardItem<T>['value']
  type?: 'slider' | 'list'
}

export default function TrayCard<T>({
  title,
  description,
  icon,
  items,
  onPress,
  selected,
  type = 'list',
}: TrayCardProps<T>) {
  const { colors } = themeStore()

  const [isOpen, setIsOpen] = useState(false)

  // const height = useSharedValue('0%') as any
  const iconRotate = useSharedValue(0)

  // useEffect(() => {
  //   if (isOpen) {
  //     iconRotate.value = withTiming(90, {
  //       duration: 200,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  //     })
  //     height.value = withTiming('auto', {
  //       duration: 200,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  //     })
  //   } else {
  //     iconRotate.value = withTiming(0, {
  //       duration: 200,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  //     })
  //     height.value = withTiming('0%', {
  //       duration: 200,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  //     })
  //   }
  // }, [isOpen])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: isOpen ? 'auto' : '0%',
    }
  })

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(35).stiffness(900)}
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 40,
          padding: 10,
          width: '100%',
          // height: 'auto',
          flexDirection: 'column',
          overflow: 'hidden',
          // gap: 10,
          alignItems: 'center',
        },
        // animatedStyle,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ gap: 4, flex: 1, marginLeft: 16 }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.text,
            }}
            bold
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
            }}
          >
            {description}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: 100,
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Pressable
            android_ripple={{ color: colors.primary }}
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              haptics.tactile()
              setIsOpen(!isOpen)
            }}
          >
            <Animated.View
              style={[
                useAnimatedStyle(() => {
                  return {
                    transform: [{ rotate: `${iconRotate.get()}deg` }],
                  }
                }),
              ]}
            >
              <MaterialIcons
                name={icon as any}
                size={24}
                color={colors.text}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <Animated.View
        layout={LinearTransition.springify().damping(26).stiffness(300)}
        style={[
          {
            overflow: 'hidden',
            height: 'auto',
            width: '100%',
            borderRadius: 30,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            gap: 8,
            overflow: 'hidden',
            width: '100%',
            borderRadius: 30,
            marginTop: 10,
          }}
        >
          {type === 'list' ? (
            items.map((item) => (
              <TrayCardItem
                key={item.value as any}
                title={item.title}
                onPress={() => {
                  onPress(item.value)
                  setIsOpen(false)
                }}
                selected={selected === item.value}
              />
            ))
          ) : (
            <SliderCard
              progress={selected as any}
              onProgressChange={(progress) => {
                onPress(progress as T)
              }}
            />
          )}
        </View>
      </Animated.View>
    </Animated.View>
  )
}

type TrayCardItemProps = {
  title: string
  onPress: () => void
  selected: boolean
}

const TrayCardItem = ({ title, onPress, selected }: TrayCardItemProps) => {
  const { colors } = themeStore()
  return (
    <View
      style={{
        backgroundColor: selected ? colors.primary : colors.background,
        width: '100%',
        borderRadius: 10,
        height: 40,
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <Pressable
        android_ripple={{ color: colors.primary }}
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 20,
          // alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 16,
            color: selected ? colors.text : colors.textSecondary,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  )
}
