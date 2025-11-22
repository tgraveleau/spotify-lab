import { colors } from '$ui/theme/colors'
import { Size } from '$ui/theme/theme.types'

export type Variant = 'primary' | 'secondary'

export const BUTTON_VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'border-secondary',
}
export const TEXT_VARIANTS: Record<Variant, string> = {
  primary: 'text-black',
  secondary: 'text-white',
}
export const ICON_COLOR_VARIANTS: Record<Variant, string> = {
  primary: colors.black,
  secondary: colors.white,
}
export const BUTTON_SIZES: Record<Size, string> = {
  sm: 'px-4 py-2',
  md: 'px-5 py-3',
  lg: 'px-6 py-4',
}
export const TEXT_SIZES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}
