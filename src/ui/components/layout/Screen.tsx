import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

import { Box, HStack } from '../atoms/Box'
import { Text } from '../atoms/Text'
import { IconButton } from '../molecules/Button'

export type ScreenProps = SafeAreaViewProps & {
  title?: string
  subtitle?: string
  withBackButton?: boolean
}
export const Screen = ({
  title,
  subtitle,
  children,
  withBackButton = false,
  ...props
}: ScreenProps) => {
  const [backButtonWidth, setBackButtonWidth] = useState(0)
  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']} {...props}>
      <StatusBar style="light" />
      {title && (
        <HStack className="px-xs py-sm gap-sm">
          {withBackButton && (
            <IconButton
              name="arrow-left"
              variant="secondary"
              onPress={() => router.back()}
              className="self-start"
              onLayout={({ nativeEvent }) => setBackButtonWidth(nativeEvent.layout.width)}
            />
          )}
          <Box centered className="flex-1">
            <Text variant="title" className="text-center">
              {title}
            </Text>
            {subtitle && <Text variant="caption">{subtitle}</Text>}
          </Box>
          {backButtonWidth > 0 && <Box style={{ width: backButtonWidth }} />}
        </HStack>
      )}
      <Box className="flex-1 py-sm">{children}</Box>
    </SafeAreaView>
  )
}
