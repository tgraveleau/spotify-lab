import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTopTracks } from '$api/spotify/tracks'

export const WrappedScreen = () => {
  const { data } = useTopTracks()
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <View className="flex-1 items-center justify-center">
        <Text>Wrapped</Text>
        <Text>Top tracks of last 4 weeks</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.album.images[0].url }}
                style={{ width: 100, height: 100 }}
              />
              <Text>
                {item.name} - {item.artists[0].name}
              </Text>
              <Text>Album : {item.album.name}</Text>
              <Text>Temps d&apos;écoute : {item.duration_ms}</Text>
              <Text>Popularité (nombre d&apos;écoute ?) : {item.popularity}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View className="my-2 border-b border-gray-200" />}
        />
      </View>
    </SafeAreaView>
  )
}
