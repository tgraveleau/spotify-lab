import Feather from '@expo/vector-icons/Feather'
import { Pressable, PressableProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { colors } from '$ui/theme/colors'
import { Size } from '$ui/theme/theme.types'

import { Text } from '../atoms'

type Variant = 'primary' | 'secondary'
export type ButtonProps = PressableProps & {
  title: string
  variant?: Variant
  size?: Size
  iconRight?: string
}
export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  iconRight,
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
    >
      <Text weight="semibold" className={twMerge(TEXT_VARIANTS[variant], TEXT_SIZES[size])}>
        {title}
      </Text>
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
  secondary: 'border-primary',
}
const TEXT_VARIANTS: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-primary',
}
const ICON_COLOR_VARIANTS: Record<Variant, string> = {
  primary: colors.white,
  secondary: colors.primary,
}
const BUTTON_SIZES: Record<Size, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
}
const TEXT_SIZES: Record<Size, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}
const ICON_SIZES: Record<Size, number> = {
  sm: 18,
  md: 22,
  lg: 26,
}
