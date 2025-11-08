import '../global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: 'index',
}

const queryClient = new QueryClient()
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
