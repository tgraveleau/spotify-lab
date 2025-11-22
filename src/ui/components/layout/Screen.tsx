import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
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
  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']} {...props}>
      <StatusBar style="light" />
      {title && (
        <Box className="px-lg py-sm">
          <HStack className="items-center gap-md">
            {withBackButton && (
              <IconButton
                name="arrow-back"
                variant="ghost"
                size="md"
                onPress={() => router.back()}
              />
            )}
            <Box className="flex-1 gap-xxs">
              <Text variant="title" weight="bold">
                {title}
              </Text>
              {subtitle && <Text variant="caption">{subtitle}</Text>}
            </Box>
          </HStack>
        </Box>
      )}
      <Box className="flex-1">{children}</Box>
    </SafeAreaView>
  )
}
