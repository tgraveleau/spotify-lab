import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

type Variant = 'body' | 'title' | 'subtitle' | 'caption'
export type TextProps = RNTextProps & {
  variant?: Variant
}
const variants: Record<Variant, string> = {
  body: '',
  title: 'text-2xl font-bold',
  subtitle: 'text-md font-medium',
  caption: 'text-sm text-darker-white',
}
export const Text = ({ variant = 'body', className, ...props }: TextProps) => {
  const variantClassName = variants[variant]
  return (
    <RNText
      className={twMerge('text-white font-[Inter]', variantClassName, className)}
      {...props}
    />
  )
}
