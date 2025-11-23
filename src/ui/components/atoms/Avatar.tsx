import { Image, ImageProps } from 'expo-image'
import { twMerge } from 'tailwind-merge'

import { Size } from '$ui/theme/theme.types'

import { Box } from './Box'
import { Text } from './Text'

export type AvatarProps = ImageProps & {
  size?: Size
  notFullyRounded?: boolean
}
export const Avatar = ({ source, size = 'md', notFullyRounded = false, ...props }: AvatarProps) => {
  return source ? (
    <Image
      source={source}
      className={twMerge('rounded-full', SIZES[size], notFullyRounded && 'rounded')}
      contentFit="cover"
      {...props}
    />
  ) : (
    <Box
      className={twMerge('rounded-full bg-light-gray', SIZES[size], notFullyRounded && 'rounded')}
    >
      <Text>WOW</Text>
    </Box>
  )
}

const SIZES: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}
