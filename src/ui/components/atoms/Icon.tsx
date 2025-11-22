import Feather from '@expo/vector-icons/Feather'

import { Size } from '$ui/theme/theme.types'

export type IconProps = {
  name: keyof typeof Feather.glyphMap
  size?: Size
  color: string
}
export const Icon = ({ name, size = 'md', color }: IconProps) => {
  return <Feather name={name} size={ICON_SIZES[size]} color={color} />
}

const ICON_SIZES: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}
