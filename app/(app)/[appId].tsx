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

export default function AppScreen() {
  const { appId } = useLocalSearchParams()
  const { colors } = themeStore()
  const { top, bottom } = useSafeAreaInsets()

  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['apps'],
    queryFn: () => getApp(appId as string),
  })

  if (!data || error) {
    return <Redirect href="/" />
  }

  if (isLoading) {
    return <LoadingScreen loading={isLoading} />
  }

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={colors.textSecondary}
            style={{
              backgroundColor: colors.background,
              elevation: 0,
            }}
            progressBackgroundColor={colors.background}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
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
              padding: 12,
              borderRadius: 100,
              backgroundColor: colors.surface,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: data.image }}
              style={{
                flex: 1,
                borderRadius: 100,
                objectFit: 'contain',
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
              {data.description}
            </Text>
          </View>
        </View>

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
            onPress={() => Linking.openURL(data.downloadLink)}
          >
            <MaterialIcons
              name="link"
              size={24}
              color={colors.text}
            />
            <Text>Install</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
