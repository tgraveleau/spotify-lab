import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

type Variant = 'body' | 'title' | 'subtitle' | 'caption'
type Intent = 'default' | 'success' | 'warning' | 'info' | 'danger'
type Weight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextProps = RNTextProps & {
  variant?: Variant
  intent?: Intent
  weight?: Weight
}

export const Text = ({
  variant = 'body',
  intent = 'default',
  weight = 'regular',
  className,
  ...props
}: TextProps) => {
  return (
    <RNText
      className={twMerge(
        'font-[Inter]',
        variants[variant],
        intents[intent],
        weights[weight],
        className
      )}
      {...props}
    />
  )
}

const variants: Record<Variant, string> = {
  body: '',
  title: 'text-2xl font-bold',
  subtitle: 'text-md font-medium',
  caption: 'text-sm text-darker-white',
}
const intents: Record<Intent, string> = {
  default: 'text-white',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  danger: 'text-red-500',
}
const weights: Record<Weight, string> = {
  regular: 'font-regular',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}
