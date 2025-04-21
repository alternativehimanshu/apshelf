import { Text } from '@/components/ui/Text'
import { Redirect, useLocalSearchParams } from 'expo-router'
import {
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native'
import { apps } from '../(tabs)/(home)'
import { themeStore } from '@/store/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '@/components/BackButton'
import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import { Image } from 'expo-image'
import { MaterialIcons } from '@expo/vector-icons'
import { getApp, getApps } from '@/lib/api/fdroid'
import { useQuery } from '@tanstack/react-query'
import ErrorView from '@/components/ErrorView'
import { App } from '@/models/v1'
import { selectedAppAtom } from '@/store/atoms'
import { useAtomValue } from 'jotai'
import Animated, { LinearTransition } from 'react-native-reanimated'
export default function AppScreen() {
  const { appId } = useLocalSearchParams()
  const { colors } = themeStore()
  const { top, bottom } = useSafeAreaInsets()
  const selectedApp = useAtomValue(selectedAppAtom)
  const data = selectedApp
  const [showDescription, setShowDescription] = useState(false)
  // const { data, error, isLoading, refetch, isRefetching } = useQuery({
  //   queryKey: ['apps'],
  //   queryFn: () => getApp(appId as string),

  if (!data) {
    return <ErrorView error="App not found" />
  }

  // if (isLoading) {
  //   return <LoadingScreen loading={isLoading} />
  // }

  return (
    <View
      style={{ flex: 1, paddingTop: top, backgroundColor: colors.background }}
    >
      <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     tintColor={colors.textSecondary}
        //     style={{
        //       backgroundColor: colors.background,
        //       elevation: 0,
        //     }}
        //     refreshing={isRefetching}
        //     onRefresh={refetch}
        //   />
        // }
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: bottom,
          gap: 12,
        }}
      >
        <BackButton />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              backgroundColor: 'white',
              overflow: 'hidden',
              padding: 12,
            }}
          >
            <Image
              source={{ uri: data.icon }}
              style={{
                borderRadius: 100,
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: colors.text,
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
              }}
            >
              {data.localized?.['en-US']?.summary}
            </Text>
          </View>
        </View>

        <Animated.View
          layout={LinearTransition.springify().damping(50).stiffness(900)}
          style={{
            overflow: 'hidden',
            borderRadius: 30,
            backgroundColor: colors.surface,
          }}
        >
          <Pressable
            android_ripple={{ color: colors.ripple }}
            style={{
              padding: 20,
              width: '100%',
              flexDirection: 'row',
              gap: 4,
            }}
            onPress={() => setShowDescription(!showDescription)}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              {data.localized?.['en-US']?.description?.length
                ? showDescription
                  ? data.localized?.['en-US']?.description
                  : data.localized?.['en-US']?.description?.slice(0, 300) +
                    '...'
                : 'No description'}
            </Text>
          </Pressable>
        </Animated.View>

        <View
          style={{
            overflow: 'hidden',
            borderRadius: 100,
            backgroundColor: colors.surface,
          }}
        >
          <Pressable
            android_ripple={{ color: colors.ripple }}
            style={{
              padding: 12,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 4,
            }}
            onPress={() => Linking.openURL(data.sourceCode || '')}
          >
            <MaterialIcons
              name="link"
              size={24}
              color={colors.text}
            />
            <Text>View Source</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
