import { View, ViewProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export type BoxProps = ViewProps & {
  centered?: boolean
}
export const Box = ({ className, centered = false, ...props }: BoxProps) => {
  return (
    <View className={twMerge(centered && 'items-center justify-center', className)} {...props} />
  )
}

export type HStackProps = BoxProps
export const HStack = ({ className, ...props }: HStackProps) => {
  return <Box className={`flex-row ${className}`} {...props} />
}
