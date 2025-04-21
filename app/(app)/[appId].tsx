import { Text } from "@/components/ui/Text";
import { Redirect, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { apps } from "../(tabs)/(home)";

export default function AppScreen() {
  const { appId } = useLocalSearchParams()

  const app = apps.find((app) => app.id === Number(appId))

  if (!app) {
    return <Redirect href="/" />
  }     

  return <View>
    <Text>App</Text>
  </View>
}
