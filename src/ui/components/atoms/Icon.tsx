import Ionicons from '@expo/vector-icons/Ionicons'

import { Size } from '$ui/theme/theme.types'

export type IconName = keyof typeof Ionicons.glyphMap
export type IconProps = {
  name: IconName
  size?: Size
  color: string
}
export const Icon = ({ name, size = 'md', color }: IconProps) => {
  return <Ionicons name={name} size={ICON_SIZES[size]} color={color} />
}

const ICON_SIZES: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}
