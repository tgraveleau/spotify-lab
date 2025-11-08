import '../global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useIsAppLoaded } from '$services/app'

SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: 'index',
}

const queryClient = new QueryClient()
export default function RootLayout() {
  const appLoaded = useIsAppLoaded()

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hide()
    }
  }, [appLoaded])

  if (!appLoaded) {
    return <ActivityIndicator />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
