import '../global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { ReanimatedLogLevel, configureReanimatedLogger } from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useIsAppLoaded } from '$services/app'
import { colors } from '$ui/theme/colors'

SplashScreen.preventAutoHideAsync()
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

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
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.black } }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
