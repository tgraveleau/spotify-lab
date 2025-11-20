import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

import { Box, HStack } from '../atoms/Box'
import { Text } from '../atoms/Text'

export type ScreenProps = SafeAreaViewProps
export const Screen = ({ children, ...props }: ScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']} {...props}>
      <StatusBar style="light" />
      {children}
    </SafeAreaView>
  )
}

export type TabScreenProps = ScreenProps & {
  title: string
  subtitle?: string
}
export const TabScreen = ({ title, subtitle, children }: TabScreenProps) => {
  return (
    <Screen>
      <HStack centered className="py-sm">
        <Box centered>
          <Text variant="title">{title}</Text>
          {subtitle && <Text variant="caption">{subtitle}</Text>}
        </Box>
      </HStack>
      <Box className="flex-1 py-sm">{children}</Box>
    </Screen>
  )
}
