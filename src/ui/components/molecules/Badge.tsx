import { twMerge } from 'tailwind-merge'

import { Box, BoxProps, Text } from '../atoms'

export type BadgeProps = BoxProps & {
  text: string
}
export const Badge = ({ text, className, ...props }: BadgeProps) => {
  return (
    <Box
      className={twMerge(
        'rounded-sm items-center justify-center px-[2px] bg-darker-white text-black',
        className
      )}
      {...props}
    >
      <Text className="text-xs font-semibold text-black">{text}</Text>
    </Box>
  )
}
