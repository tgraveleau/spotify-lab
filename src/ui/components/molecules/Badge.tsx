import { twMerge } from 'tailwind-merge'

import { BoxProps, HStack, Text, TextProps } from '../atoms'
import { IconButton } from './Button'

export type BadgeProps = BoxProps &
  TextProps & {
    text: string
    onIconPress?: () => void
    skinny?: boolean
  }
export const Badge = ({
  text,
  variant = 'ghost',
  weight = 'semibold',
  skinny = false,
  onIconPress,
  className,
  ...props
}: BadgeProps) => {
  return (
    <HStack
      centered
      className={twMerge(
        'rounded px-xs py-xxs gap-xxs bg-light-gray',
        skinny && 'px-xxs py-0',
        onIconPress && 'pr-xxs',
        className
      )}
      {...props}
    >
      <Text variant={variant} weight={weight}>
        {text}
      </Text>
      {onIconPress && (
        <IconButton name="close" size="sm" variant="ghost" onPress={onIconPress} noContainer />
      )}
    </HStack>
  )
}
