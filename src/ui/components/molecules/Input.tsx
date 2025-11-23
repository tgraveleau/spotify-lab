import { useRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { colors } from '../../theme/colors'
import { Pressable } from '../atoms'
import { Box, HStack } from '../atoms/Box'
import { Icon, IconName } from '../atoms/Icon'

export type InputProps = TextInputProps & {
  iconRight?: IconName
}

export const Input = ({ iconRight, className, ...props }: InputProps) => {
  const ref = useRef<TextInput>(null)
  const handlePress = () => {
    ref.current?.focus()
  }
  return (
    <Pressable onPress={handlePress} animation="none">
      <HStack className="bg-light-gray border border-gray rounded-xl px-md py-sm gap-md">
        <TextInput
          ref={ref}
          className={twMerge('text-white flex-1', 'placeholder:text-darker-white', className)}
          placeholderTextColor={colors['darker-white']}
          {...props}
        />
        {iconRight && (
          <Box className="justify-center">
            <Icon name={iconRight} size="md" color={colors['darker-white']} />
          </Box>
        )}
      </HStack>
    </Pressable>
  )
}
