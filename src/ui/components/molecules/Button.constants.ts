import { colors } from '$ui/theme/colors'
import { Size } from '$ui/theme/theme.types'

export type Variant = 'primary' | 'secondary' | 'ghost'

export const BUTTON_VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'border border-secondary',
  ghost: 'bg-light-gray active:bg-gray',
}
export const TEXT_VARIANTS: Record<Variant, string> = {
  primary: 'text-black',
  secondary: 'text-white',
  ghost: 'text-darker-white',
}
export const ICON_COLOR_VARIANTS: Record<Variant, string> = {
  primary: colors.black,
  secondary: colors.white,
  ghost: colors['darker-white'],
}
export const BUTTON_SIZES: Record<Size, string> = {
  sm: 'px-4 py-2',
  md: 'px-5 py-3',
  lg: 'px-6 py-4',
}
export const ICON_BUTTON_SIZES: Record<Size, string> = {
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-1.5',
}
export const TEXT_SIZES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}
