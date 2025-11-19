import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

type Variant = 'body' | 'title' | 'subtitle' | 'caption'
type Intent = 'default' | 'success' | 'warning' | 'info' | 'danger'
export type TextProps = RNTextProps & {
  variant?: Variant
  intent?: Intent
}

export const Text = ({ variant = 'body', intent = 'default', className, ...props }: TextProps) => {
  const variantClassName = variants[variant]
  const intentClassName = intents[intent]
  return (
    <RNText
      className={twMerge('font-[Inter]', variantClassName, intentClassName, className)}
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
