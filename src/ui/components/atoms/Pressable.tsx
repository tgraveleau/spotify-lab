import { Pressable as RNPressable, PressableProps as RNPressableProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export type PressableProps = RNPressableProps & {
  animation?: 'scale' | 'opacity'
}
export const Pressable = ({ animation = 'scale', className, ...props }: PressableProps) => {
  const isClickable = props.onPress && !props.disabled
  const opacityClassName = twMerge('active:opacity-90', isClickable && 'hover:opacity-80')
  const scaleClassName = twMerge('active:scale-[0.98]', isClickable && 'hover:scale-[1.02]')
  return (
    <RNPressable
      {...props}
      className={twMerge(
        'transition duration-200 ease-in-out',
        animation === 'scale' ? scaleClassName : opacityClassName,
        className
      )}
    />
  )
}
