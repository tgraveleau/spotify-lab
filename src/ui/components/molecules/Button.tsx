import { ActivityIndicator } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { Size } from '$ui/theme/theme.types'

import { Text } from '../atoms'
import {
  BUTTON_VARIANTS,
  TEXT_VARIANTS,
  ICON_COLOR_VARIANTS,
  BUTTON_SIZES,
  TEXT_SIZES,
  Variant,
} from './Button.constants'
import { Icon, IconName, IconProps } from '../atoms/Icon'
import { Pressable, PressableProps } from '../atoms/Pressable'

export type ButtonProps = PressableProps & {
  title: string
  variant?: Variant
  size?: Size
  iconRight?: IconName
  isLoading?: boolean
}
export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  iconRight,
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        'rounded-full flex-row gap-2 items-center justify-center',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
      {...props}
      disabled={isLoading}
    >
      <Text weight="semibold" className={twMerge(TEXT_VARIANTS[variant], TEXT_SIZES[size])}>
        {title}
      </Text>
      {isLoading && <ActivityIndicator size="small" color={ICON_COLOR_VARIANTS[variant]} />}
      {iconRight && <Icon name={iconRight} size={size} color={ICON_COLOR_VARIANTS[variant]} />}
    </Pressable>
  )
}

export type IconButtonProps = PressableProps &
  Omit<IconProps, 'color'> & {
    variant?: Variant
  }
export const IconButton = ({
  name,
  size = 'md',
  variant = 'primary',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable
      className={twMerge('rounded-full p-2', BUTTON_VARIANTS[variant], className)}
      {...props}
    >
      <Icon name={name} size={size} color={ICON_COLOR_VARIANTS[variant]} />
    </Pressable>
  )
}
