import { Image } from 'expo-image'
import { useState } from 'react'

import { useSpotifyApi } from '$api/spotify/spotify'
import { useSpotifyStore } from '$api/spotify/spotify.store'
import { Box, HStack, Text } from '$ui/components/atoms'
import { Screen } from '$ui/components/layout'
import { Button } from '$ui/components/molecules'

export const ProfileScreen = () => {
  const { loginInBrowser, isGettingToken, logout, isAuthenticated } = useSpotifyApi()
  const { user } = useSpotifyStore()
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
    <Screen
      title="Profile"
      subtitle={
        isAuthenticated
          ? 'Gérez votre compte et vos paramètres'
          : 'Connectez-vous pour accéder à vos playlists'
      }
    >
      <Box className="flex-1 px-md">
        {isAuthenticated ? (
          <Box className="gap-md">
            {user && (
              <Box className="bg-light-gray rounded-xl p-lg border border-light-gray gap-md">
                <HStack className="items-center gap-md">
                  {user.images?.length && user.images.length > 0 && (
                    <Image
                      source={user.images}
                      className="w-16 h-16 rounded-full"
                      contentFit="cover"
                      transition={200}
                    />
                  )}
                  <Box className="flex-1">
                    <Text variant="subtitle" weight="bold" className="mb-xxs">
                      {user.displayName || 'Utilisateur'}
                    </Text>
                    <Text variant="ghost" className="text-darker-white">
                      Compte Spotify connecté
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
            <Button
              title="Se déconnecter"
              variant="secondary"
              onPress={logout}
              className="mt-auto"
            />
          </Box>
        ) : (
          <Box className="gap-md">
            <Box className="bg-light-gray rounded-xl p-lg border border-light-gray gap-sm">
              <Text variant="body" className="text-darker-white text-center">
                Connectez-vous avec votre compte Spotify pour créer et gérer vos playlists
                personnalisées.
              </Text>
            </Box>
            <Button
              title={isGettingToken ? 'Connexion en cours...' : 'Se connecter avec Spotify'}
              onPress={handleLogin}
              iconRight="open-outline"
              disabled={isGettingToken}
              isLoading={isGettingToken}
            />
            {error && (
              <Box className="bg-red-900/20 border border-red-900/50 rounded-xl p-md">
                <Text variant="ghost" className="text-red-400 text-center">
                  {error}
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Screen>
  )
}
