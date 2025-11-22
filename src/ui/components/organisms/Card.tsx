import { colors } from '$ui/theme/colors'

import { Text } from '../atoms'
import { HStack, Box } from '../atoms/Box'
import { Icon, IconName } from '../atoms/Icon'
import { Pressable, PressableProps } from '../atoms/Pressable'

export type CardProps = PressableProps & {
  title: string
  subtitle: string
  icon?: IconName
  onPress: () => void
}
export const Card = ({ title, subtitle, icon, onPress }: CardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-light-gray rounded-xl p-md border border-light-gray flex-row items-center justify-between"
    >
      <HStack className="items-center gap-md flex-1">
        {icon && (
          <Box className="bg-primary/10 p-sm rounded-lg">
            <Icon name={icon} size="md" color={colors.primary} />
          </Box>
        )}
        <Box className="flex-1 gap-xxs">
          <Text variant="subtitle" weight="semibold">
            {title}
          </Text>
          {subtitle && <Text variant="caption">{subtitle}</Text>}
        </Box>
      </HStack>
      <Icon name="chevron-forward" size="md" color={colors['darker-white']} />
    </Pressable>
  )
}
