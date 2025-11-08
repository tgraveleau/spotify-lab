import { useState } from 'react'
import { Button, Text, View } from 'react-native'

import { useSpotifyApi } from '$api/spotify/spotify'
import { TabScreen } from '$ui/components/molecules/Screen'

export const ProfileScreen = () => {
  const { loginInBrowser, isGettingToken, logout, isAuthenticated } = useSpotifyApi()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    try {
      await loginInBrowser()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  }

  return (
    <TabScreen title="Profile">
      <View className="flex-1 items-center justify-center">
        {isAuthenticated ? (
          <>
            <Text>Connected</Text>
            <Button title="Déconnexion" onPress={logout} />
          </>
        ) : (
          <>
            <Text>Not connected</Text>
            <Button
              title={isGettingToken ? 'Connexion en cours...' : 'Se connecter avec Spotify'}
              onPress={handleLogin}
              disabled={isGettingToken}
            />
            {error && (
              <View className="bg-red-900/50 p-4 rounded-lg mb-4 w-full max-w-sm">
                <Text className="text-red-200 text-center">{error}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </TabScreen>
  )
}
