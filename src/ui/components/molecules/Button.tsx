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
  ICON_BUTTON_SIZES,
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
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        'rounded-xl flex-row gap-2 items-center justify-center',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        disabled && 'bg-light-gray',
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      <Text
        weight="semibold"
        className={twMerge(
          TEXT_VARIANTS[variant],
          TEXT_SIZES[size],
          disabled && 'text-darker-white'
        )}
      >
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
    color?: string
    noContainer?: boolean
  }
export const IconButton = ({
  name,
  size = 'md',
  variant = 'primary',
  color = ICON_COLOR_VARIANTS[variant],
  noContainer = false,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        'rounded-full',
        BUTTON_VARIANTS[variant],
        ICON_BUTTON_SIZES[size],
        noContainer && 'p-0 bg-transparent',
        className
      )}
      {...props}
    >
      <Icon name={name} size={size} color={color} />
    </Pressable>
  )
}
