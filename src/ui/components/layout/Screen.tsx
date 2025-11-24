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
  onBackButtonPress?: () => void
}
export const Screen = ({
  title,
  subtitle,
  children,
  withBackButton = false,
  onBackButtonPress,
  ...props
}: ScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom']} {...props}>
      <StatusBar style="light" />
      {title && (
        <Box className="px-lg py-sm">
          <HStack className="items-center gap-md">
            {withBackButton && (
              <IconButton
                name="arrow-back"
                variant="ghost"
                size="md"
                onPress={onBackButtonPress ?? (() => router.back())}
              />
            )}
            <Box className="flex-1 gap-xxs">
              <Text variant="title" weight="bold">
                {title}
              </Text>
              {subtitle && <Text variant="ghost">{subtitle}</Text>}
            </Box>
          </HStack>
        </Box>
      )}
      <Box className="flex-1">{children}</Box>
    </SafeAreaView>
  )
}
