import Feather from '@expo/vector-icons/Feather'
import { ActivityIndicator } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { colors } from '$ui/theme/colors'
import { Size } from '$ui/theme/theme.types'

import { Text } from '../atoms'
import { Pressable, PressableProps } from '../atoms/Pressable'

type Variant = 'primary' | 'secondary'
export type ButtonProps = PressableProps & {
  title: string
  variant?: Variant
  size?: Size
  iconRight?: string
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
        'rounded-full flex-row gap-2 items-center justify-center border',
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
      {iconRight && (
        <Feather
          name={iconRight as any}
          size={ICON_SIZES[size]}
          color={ICON_COLOR_VARIANTS[variant]}
        />
      )}
    </Pressable>
  )
}

const BUTTON_VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'border-secondary',
}
const TEXT_VARIANTS: Record<Variant, string> = {
  primary: 'text-black',
  secondary: 'text-white',
}
const ICON_COLOR_VARIANTS: Record<Variant, string> = {
  primary: colors.black,
  secondary: colors.white,
}
const BUTTON_SIZES: Record<Size, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
}
const TEXT_SIZES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}
const ICON_SIZES: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}
