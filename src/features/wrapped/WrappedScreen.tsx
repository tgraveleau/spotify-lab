import { router } from 'expo-router'

import { TimeRange } from '$api/spotify/spotify.types'
import { Box } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'
import { Card } from '$ui/components/organisms'
import { CardProps } from '$ui/components/organisms/Card'

const timeRanges: (Pick<CardProps, 'title' | 'subtitle' | 'icon'> & { timeRange: TimeRange })[] = [
  {
    timeRange: 'short_term',
    title: '1 mois',
    subtitle: 'Vos morceaux les plus écoutés sur les 4 dernières semaines',
    icon: 'flash',
  },
  {
    timeRange: 'medium_term',
    title: '6 mois',
    subtitle: 'Vos morceaux les plus écoutés sur les 6 derniers mois',
    icon: 'calendar',
  },
  {
    timeRange: 'long_term',
    title: '1 an',
    subtitle: 'Vos morceaux les plus écoutés sur les 12 derniers mois',
    icon: 'star',
  },
]

export const WrappedScreen = () => {
  const handleCreateWrapped = (timeRange: TimeRange) => {
    router.push({
      pathname: '/wrapped/create',
      params: { time_range: timeRange },
    })
  }

  return (
    <Screen
      title="Wrapped"
      subtitle="Créez un wrapped de vos morceaux les plus écoutés sur une période donnée pour le partager avec vos amis ou le réécouter plus tard"
    >
      <Box className="flex-1 px-md">
        <Box className="gap-sm">
          {timeRanges.map(({ timeRange, title, subtitle, icon }) => (
            <Card
              key={timeRange}
              title={title}
              subtitle={subtitle}
              icon={icon}
              onPress={() => handleCreateWrapped(timeRange)}
            />
          ))}
        </Box>
      </Box>
    </Screen>
  )
}
