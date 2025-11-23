import { router } from 'expo-router'

import { Box } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'
import { Card } from '$ui/components/organisms'

export const DiscoverScreen = () => {
  return (
    <Screen
      title="Discover"
      subtitle="Créez une playlist personnalisée en sélectionnant vos artistes préférés et leurs meilleurs titres"
    >
      <Box className="flex-1 p-md">
        <Box className="gap-md">
          <Card
            title="Découvrez de nouveaux artistes"
            subtitle="Recherchez et sélectionnez vos artistes favoris pour créer une playlist unique avec leurs meilleurs titres"
            icon="search"
            onPress={() => router.push({ pathname: '/discover/create' })}
          />
        </Box>
      </Box>
    </Screen>
  )
}
