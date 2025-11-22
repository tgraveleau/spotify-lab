import { router } from 'expo-router'

import { Screen } from '$ui/components/layout'
import { Button } from '$ui/components/molecules'

export const WrappedScreen = () => {
  return (
    <Screen title="Wrapped" subtitle="Your top tracks in a playlist">
      <Button
        title="Create Wrapped for short term"
        onPress={() =>
          router.push({
            pathname: '/wrapped/create',
            params: { time_range: 'short_term' },
          })
        }
      />
      <Button
        title="Create Wrapped for medium term"
        onPress={() =>
          router.push({
            pathname: '/wrapped/create',
            params: { time_range: 'medium_term' },
          })
        }
      />
      <Button
        title="Create Wrapped for long term"
        onPress={() =>
          router.push({
            pathname: '/wrapped/create',
            params: { time_range: 'long_term' },
          })
        }
      />
    </Screen>
  )
}
