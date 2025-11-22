import { useLocalSearchParams } from 'expo-router'

import { TimeRange } from '$api/spotify/spotify.types'
import { CreateWrappedScreen } from '$features/wrapped/CreateWrappedScreen'

export default function CreateWrappedRoute() {
  const timeRange = useLocalSearchParams<{ time_range: TimeRange }>().time_range
  return <CreateWrappedScreen timeRange={timeRange} />
}
