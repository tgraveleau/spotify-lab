import { ReactNode } from 'react'
import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box } from '../atoms'

export type FlatListProps<ItemT> = RNFlatListProps<ItemT> & {
  withBottomSafeArea?: boolean
}
export const FlatList: <T>(props: FlatListProps<T>) => ReactNode = ({
  withBottomSafeArea = false,
  ...props
}) => {
  const insets = useSafeAreaInsets()
  return (
    <RNFlatList
      ListFooterComponent={
        withBottomSafeArea ? () => <Box style={{ height: insets.bottom }} /> : undefined
      }
      {...props}
    />
  )
}
